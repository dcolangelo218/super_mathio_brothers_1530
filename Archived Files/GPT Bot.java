import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;


class ChatMessage {
    enum Role { system, user, assistant }
    private final Role role;
    private final String content;

    ChatMessage(Role role, String content) {
        this.role = role;
        this.content = content;
    }

    Role getRole() { return role; }
    String getContent() { return content; }
}


class GPTService {

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(5))
            .build();

    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";
    private static final String DEFAULT_MODEL = "gpt-3.5-turbo";

    private final String apiKey;

    GPTService() {
        this.apiKey = System.getenv("OPENAI_API_KEY");
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("OPENAI_API_KEY env variable not set");
        }
    }

    /**
     * Generates a chat completion from a list of ChatMessage objects.
     *
     * @param messages     Ordered list of conversation messages.
     * @param temperature  Creativity setting (0–2). 0.7 is a good default.
     * @return Assistant reply text (first choice).
     * @throws Exception   Network / parsing errors are propagated to caller.
     */
    String getChatCompletion(List<ChatMessage> messages, double temperature) throws Exception {
        // Build JSON payload
        JsonObjectBuilder requestBody = Json.createObjectBuilder()
                .add("model", DEFAULT_MODEL)
                .add("temperature", temperature);

        JsonArrayBuilder msgArray = Json.createArrayBuilder();
        for (ChatMessage m : messages) {
            msgArray.add(Json.createObjectBuilder()
                    .add("role", m.getRole().name())
                    .add("content", m.getContent()));
        }
        requestBody.add("messages", msgArray);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(OPENAI_URL))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .POST(HttpRequest.BodyPublishers.ofString(requestBody.build().toString()))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new RuntimeException("OpenAI API error: HTTP " + response.statusCode() + " – " + response.body());
        }

        JsonObject json = Json.createReader(new java.io.StringReader(response.body())).readObject();
        String assistantReply = json
                .getJsonArray("choices")
                .getJsonObject(0)
                .getJsonObject("message")
                .getString("content");
        return assistantReply.trim();
    }
}


class AIGuideHelper {

    private final GPTService gptService = new GPTService();

    /**
     * Generates a lesson for a tutorial level.
     *
     * @param topic   e.g. "Algebra basics: solving linear equations"
     * @return Lesson text.
     */
    String generateLesson(String topic) {
        try {
            List<ChatMessage> prompt = List.of(
                    new ChatMessage(ChatMessage.Role.system, "You are an engaging math tutor for a 2‑D game. " +
                            "Explain concepts concisely, with 1–2 short examples, no calculator required."),
                    new ChatMessage(ChatMessage.Role.user, "Teach me the topic: " + topic)
            );
            return gptService.getChatCompletion(prompt, 0.7);
        } catch (Exception e) {
            return fallback(e);
        }
    }

    /**
     * Generates a hint for a specific math question the player is stuck on.
     *
     * @param questionText The question shown in‑game.
     * @return A succinct hint (not the full answer) to help the player.
     */
    String generateHint(String questionText) {
        try {
            List<ChatMessage> prompt = List.of(
                    new ChatMessage(ChatMessage.Role.system, "You are a helpful math tutor. " +
                            "Provide a brief hint that nudges the student but does not reveal the full answer."),
                    new ChatMessage(ChatMessage.Role.user, "I need a hint for this question: " + questionText)
            );
            return gptService.getChatCompletion(prompt, 0.5);
        } catch (Exception e) {
            return fallback(e);
        }
    }

    private String fallback(Exception e) {
        System.err.println("[AIGuideHelper] GPT fallback: " + e.getMessage());
        return "Sorry, I'm having trouble thinking right now. Try again in a moment!";
    }
}


public class GptBot {
    public static void main(String[] args) throws Exception {
        AIGuideHelper guide = new AIGuideHelper();

        // Demo 1
        String lesson = guide.generateLesson("Algebra basics: solving for x in ax + b = 0");
        System.out.println("\n--- Tutorial Lesson ---\n" + lesson);

        // Demo 2
        String hint = guide.generateHint("Solve 2x + 3 = 11");
        System.out.println("\n--- Hint ---\n" + hint);
    }
}
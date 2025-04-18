import java.net.URI;
import java.net.http.*;
import java.time.Duration;
import java.util.List;
import javax.json.*;

public class GPTService {
    private static final String URL   = "https://api.openai.com/v1/chat/completions";
    private static final String MODEL = "gpt-3.5-turbo";

    private final String apiKey = System.getenv("OPENAI_API_KEY");
    private final HttpClient http = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(5)).build();

    public GPTService() {
        if (apiKey == null || apiKey.isBlank())
            throw new IllegalStateException("OPENAI_API_KEY not set");
    }

    public String getChatCompletion(List<ChatMessage> msgs, double temp) throws Exception {
        JsonArrayBuilder arr = Json.createArrayBuilder();
        for (ChatMessage m : msgs)
            arr.add(Json.createObjectBuilder()
                      .add("role", m.getRole().name())
                      .add("content", m.getContent()));
        JsonObject body = Json.createObjectBuilder()
                .add("model", MODEL)
                .add("temperature", temp)
                .add("messages", arr).build();

        HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create(URL))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .POST(HttpRequest.BodyPublishers.ofString(body.toString()))
                .timeout(Duration.ofSeconds(20)).build();

        HttpResponse<String> res = http.send(req, HttpResponse.BodyHandlers.ofString());
        if (res.statusCode() != 200)
            throw new RuntimeException("OpenAI error " + res.statusCode() + " " + res.body());

        JsonObject json = Json.createReader(new java.io.StringReader(res.body()))
                              .readObject();
        return json.getJsonArray("choices").getJsonObject(0)
                   .getJsonObject("message").getString("content").trim();
    }
}

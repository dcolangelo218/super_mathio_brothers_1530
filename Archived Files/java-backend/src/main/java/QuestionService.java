import java.util.List;

public class QuestionService {
    private final QuestionDAO dao = new QuestionDAO();
    private final GPTService  gpt = new GPTService();

    public Question getQuestion(String type){
        return dao.randomByType(type).orElseGet(()->{
            Question q = gen(type);
            dao.insert(q);
            return q;
        });
    }

    private Question gen(String type){
        try{
            String sys = "You are a math problem generator. "
                       + "Return exactly: Q:<question>\\nA:<answer> "
                       + "for topic "+type+". Integers only.";
            String raw = gpt.getChatCompletion(
                           List.of(new ChatMessage(ChatMessage.Role.system,sys)),0.2);
            String[] qa = raw.split("\\nA:");
            String qt   = qa[0].replaceFirst("Q:\\s*","").trim();
            String ans  = qa[1].trim();
            return new Question(0, qt, List.of(ans), type);
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }
}

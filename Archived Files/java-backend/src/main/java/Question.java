import java.util.List;

public class Question {
    private int          questionId;
    private String       questionText;
    private List<String> correctAnswers;
    private String       worldTopic;

    public Question(int id, String text, List<String> answers, String topic) {
        questionId     = id;
        questionText   = text;
        correctAnswers = answers;
        worldTopic     = topic;
    }

    public int          getQuestionId()     { return questionId; }
    public String       getQuestionText()   { return questionText; }
    public List<String> getCorrectAnswers() { return correctAnswers; }
    public String       getWorldTopic()     { return worldTopic; }
}

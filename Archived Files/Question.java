import java.util.List;

public class Question {
    private int questionId;
    private String questionText;
    private List<String> correctAnswers;//questions may have multiple right answers
    private String worldTopic;//I mean like Algebra, Statistics

    public Question() {
    }
    
    public Question(int questionId, String questionText, List<String> correctAnswers, String worldTopic) {
        this.questionId = questionId;
        this.questionText = questionText;
        this.correctAnswers = correctAnswers;
        this.worldTopic = worldTopic;
    }

    public int getQuestionId() { 
        return questionId; }
    public void setQuestionId(int questionId) { 
        this.questionId = questionId; }
    
    public String getQuestionText() { 
        return questionText; }
    public void setQuestionText(String questionText) { 
        this.questionText = questionText; }
    
    public List<String> getCorrectAnswers() { 
        return correctAnswers; }
    public void setCorrectAnswers(List<String> correctAnswers) { 
        this.correctAnswers = correctAnswers; }
    
    public String getWorldTopic() { 
        return worldTopic; }
    public void setWorldTopic(String worldTopic) { 
        this.worldTopic = worldTopic; }
}
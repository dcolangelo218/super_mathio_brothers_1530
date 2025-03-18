public class Tutorial extends Level {
    private String tutorialTopic;//like algebra basics

    public Tutorial(int levelNumber, String tutorialTopic) {
        super(levelNumber);
        this.tutorialTopic = tutorialTopic;
    }

    public String getTutorialTopic() { 
        return tutorialTopic; }
    public void setTutorialTopic(String tutorialTopic) { 
        this.tutorialTopic = tutorialTopic; }
}
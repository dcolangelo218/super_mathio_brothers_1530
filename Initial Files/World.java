import java.util.ArrayList;
import java.util.List;

public class World {
    private int worldNumber;
    private Tutorial tutorialLevel;
    private List<Level> levels;

    public World(int worldNumber, String tutorialTopic) {
        this.worldNumber = worldNumber;
    //tutorial is level 0
        this.tutorialLevel = new Tutorial(0, tutorialTopic);
        this.levels = new ArrayList<>();
    }

    public int getWorldNumber() { 
        return worldNumber; }

    public void setWorldNumber(int worldNumber) { 
        this.worldNumber = worldNumber; }

    public Tutorial getTutorialLevel() { 
        return tutorialLevel; }

    public List<Level> getLevels() { 
        return levels; }

    public void addLevel(Level level) { 
        this.levels.add(level); }
        
}
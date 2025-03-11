import java.util.ArrayList;
import java.util.List;

public class Level {
    private int levelNumber;
    private List<Enemy> enemies;
    private boolean isCompleted;

    public Level(int levelNumber) {
        this.levelNumber = levelNumber;
        this.enemies = new ArrayList<>();
        this.isCompleted = false;
    }

    public int getLevelNumber() { 
        return levelNumber; }
    public void setLevelNumber(int levelNumber) { 
        this.levelNumber = levelNumber; }
    
    public List<Enemy> getEnemies() { 
        return enemies; }
    public void addEnemy(Enemy enemy) { 
        this.enemies.add(enemy); }
    
    public boolean isCompleted() { 
        return isCompleted; }
    public void setCompleted(boolean isCompleted) { 
        this.isCompleted = isCompleted; }
}
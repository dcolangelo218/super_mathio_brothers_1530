import java.util.ArrayList;
import java.util.List;

public class Level {
    private final int        levelNumber;
    private final List<Enemy> enemies = new ArrayList<>();
    private boolean          completed;

    public Level(int num) { levelNumber = num; }

    public void addEnemy(Enemy e)     { enemies.add(e); }
    public void removeDead()          { enemies.removeIf(e -> !e.isAlive()); }

    public void tick() {
        removeDead();
        completed = enemies.isEmpty();
    }

    public int  getLevelNumber() { return levelNumber; }
    public List<Enemy> getEnemies() { return enemies; }
    public boolean isCompleted() { return completed; }
}

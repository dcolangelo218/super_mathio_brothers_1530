import java.util.ArrayList;
import java.util.List;

public class GameMap {
    private List<World> worlds;
    private int currentWorldIndex;

    public GameMap() {
        this.worlds = new ArrayList<>();
        this.currentWorldIndex = 0;
    }

    public void addWorld(World world) {
        worlds.add(world);
    }

    public World getCurrentWorld() {
        if (currentWorldIndex >= 0 && currentWorldIndex < worlds.size()) {
            return worlds.get(currentWorldIndex);
        }
        return null;
    }

    public void moveToNextWorld() {
        if (currentWorldIndex < worlds.size() - 1) {
            currentWorldIndex++;
        }
    }

    public List<World> getAllWorlds() {
        return worlds;
    }
}
import java.util.*;

public class World {
    private int worldNumber;
    private final Tutorial tutorial;
    private final List<Level> levels = new ArrayList<>();
    private int index = -1;

    public World(int num, String tutTopic) {
        worldNumber = num;
        tutorial    = new Tutorial(tutTopic);
    }

    public void addLevel(Level l) {
        levels.add(l);
        levels.sort(Comparator.comparingInt(Level::getLevelNumber));
    }

    public Level next() {
        if (index == -1) { index = 0; return tutorial; }
        if (index < levels.size()) return levels.get(index++);
        return null;
    }
}

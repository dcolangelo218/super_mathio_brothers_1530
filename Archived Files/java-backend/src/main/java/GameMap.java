import java.util.*;

public class GameMap {
    private final List<World> worlds = new ArrayList<>();
    private int idx = 0;

    public void addWorld(World w) { worlds.add(w); }

    public Level start()          { return worlds.isEmpty()? null : worlds.get(0).next(); }

    public Level next() {
        if (worlds.isEmpty()) return null;
        Level lvl = worlds.get(idx).next();
        if (lvl != null) return lvl;       // still in current world
        idx++;
        return idx < worlds.size() ? worlds.get(idx).next() : null;
    }

    public boolean finished() { return idx >= worlds.size(); }
}

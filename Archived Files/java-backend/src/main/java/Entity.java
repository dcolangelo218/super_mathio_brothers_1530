public abstract class Entity {
    protected int id;
    protected int health;
    protected int x;
    protected int y;

    public Entity(int id, int health) {
        this.id     = id;
        this.health = health;
    }

    public int  getId()             { return id; }
    public void setId(int i)        { id = i;    }

    public int  getHealth()         { return health; }
    public void setHealth(int h)    { health = h;    }

    public int  getX()              { return x; }
    public int  getY()              { return y; }
    public void setPosition(int x, int y) { this.x = x; this.y = y; }

    public void takeDamage(int dmg) { health = Math.max(0, health - dmg); }
    public boolean isAlive()        { return health > 0; }

    public abstract void updateState();
}

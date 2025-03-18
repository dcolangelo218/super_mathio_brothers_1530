public class Player implements Entity {
    private int id;
    private int health;
    private int x;
    private int y;
//player's lives currency and name
    private int lives;
    private int currency;
    private String name;

    public Player() {
    }
    
    public Player(int id, int health, int lives) {
        this.id = id;
        this.health = health;
        this.lives = lives;
    }

    public int getId() { 
        return id; }
    public void setId(int id) { 
        this.id = id; }
    
    public int getHealth() { 
        return health; }
    public void setHealth(int health) { 
        this.health = health; }
    
    public int getX() { 
        return x; }
    public int getY() { 
        return y; }
    public void setPosition(int x, int y) { 
        this.x = x; this.y = y; }
    //update player's state
    public void updateState() {
    
    }

    // Additional getters/setters for player-specific attributes
    public int getLives() { 
        return lives; }
    public void setLives(int lives) { 
        this.lives = lives; }
    
    public int getCurrency() { 
        return currency; }
    public void setCurrency(int currency) { 
        this.currency = currency; }
    
    public String getName() { 
        return name; }
    public void setName(String name) { 
        this.name = name; }
}
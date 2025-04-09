public class Enemy implements Entity {
    private int id;
    private int health;
    private int x;
    private int y;
//EnemyType and damage
    private String enemyType;
    private int damageValue;

    public Enemy() {
// Default
    }
    
    public Enemy(int id, int health, String enemyType, int damageValue) {
        this.id = id;
        this.health = health;
        this.enemyType = enemyType;
        this.damageValue = damageValue;
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
    
    public void updateState() {
    //update state
    }
    public String getEnemyType() { 
        return enemyType; }
    public void setEnemyType(String enemyType) { 
        this.enemyType = enemyType; }
    
    public int getDamageValue() { 
        return damageValue; }
    public void setDamageValue(int damageValue) { 
        this.damageValue = damageValue; }
}
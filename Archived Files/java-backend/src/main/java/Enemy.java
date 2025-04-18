public class Enemy extends Entity {
    private String enemyType;
    private int    damageValue;

    public Enemy(int id, int health, String type, int dmg) {
        super(id, health);
        enemyType   = type;
        damageValue = dmg;
    }

    public void takeTurn(Player p) {
        if (isAlive()) {
            System.out.println(enemyType + " swings at " + p.getName());
            /* add player‑HP logic later */
        }
    }

    public void applyDamage(int dmg) { takeDamage(dmg); }

    @Override public void updateState() { }

    public String getEnemyType() { return enemyType; }
    public int    getDamageValue(){ return damageValue; }
}

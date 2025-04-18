public class Player extends Entity {
    private int    lives;
    private int    currency;
    private String name;

    public Player(int id, String name, int health, int lives) {
        super(id, health);
        this.name  = name;
        this.lives = lives;
    }

    public boolean attack(Enemy enemy, Question q, String answer) {
        if (!enemy.isAlive()) return false;
        boolean correct = q.getCorrectAnswers().stream()
                           .anyMatch(a -> a.equalsIgnoreCase(answer.trim()));
        if (correct) {
            enemy.applyDamage(10);
            currency++;
        } else {
            lives = Math.max(0, lives - 1);
        }
        return correct;
    }

    @Override public void updateState() { /* buffs, cooldowns */ }

    public int  getLives()             { return lives; }
    public void setLives(int l)        { lives = l; }
    public int  getCurrency()          { return currency; }
    public void setCurrency(int c)     { currency = c; }
    public String getName()            { return name; }
    public void   setName(String n)    { name = n; }
}

public interface Entity {
    int getId();
    void setId(int id);

    int getHealth();
    void setHealth(int health);

    int getX();
    int getY();
    void setPosition(int x, int y);

    void updateState();
}
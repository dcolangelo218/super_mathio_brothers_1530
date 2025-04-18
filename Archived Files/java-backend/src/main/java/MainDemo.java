import java.util.List;

public class MainDemo {
    public static void main(String[] args) {
        try {
            Db.conn();
            System.out.println("🗄️  DB connected.");

            QuestionService qs = new QuestionService();
            Question q = qs.getQuestion("ALG");
            System.out.println("ℹ️  Question: "+q.getQuestionText()+"  (ans="+q.getCorrectAnswers().get(0)+")");

            Player p = new Player(1,"Alice",100,3);
            Enemy  e = new Enemy(101,20,"Slime",5);

            boolean ok = p.attack(e,q,q.getCorrectAnswers().get(0));
            System.out.println("🎯  Correct? "+ok+" | Enemy HP "+e.getHealth());

            new PlayerDAO().upsert(p,1,1);
            System.out.println("💾  Player progress saved.");

        } catch(Exception ex){
            ex.printStackTrace();
        }
    }
}

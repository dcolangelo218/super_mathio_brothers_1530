import java.sql.*;
import java.util.Optional;

public class QuestionDAO {

    public Optional<Question> randomByType(String type){
        String sql = """
          SELECT type,question,answer FROM questions
          WHERE type=? ORDER BY random() LIMIT 1
          """;
        try{
            return Optional.ofNullable(
              Db.query(sql,
                       ps->ps.setString(1,type),
                       rs->new Question(0,
                               rs.getString("question"),
                               java.util.List.of(rs.getString("answer")),
                               rs.getString("type"))));
        }catch(SQLException e){ throw new RuntimeException(e); }
    }

    public void insert(Question q){
        String sql = "INSERT INTO questions(type,question,answer) VALUES (?,?,?) "+
                     "ON CONFLICT DO NOTHING";
        try{
            Db.exec(sql, ps->{
                ps.setString(1,q.getWorldTopic());
                ps.setString(2,q.getQuestionText());
                ps.setString(3,q.getCorrectAnswers().get(0));
            });
        }catch(SQLException e){ throw new RuntimeException(e); }
    }
}

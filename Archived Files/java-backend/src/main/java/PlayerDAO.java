public class PlayerDAO {
    public void upsert(Player p,int world,int level){
        String sql = """
          INSERT INTO player(name,world,level)
          VALUES (?,?,?)
          ON CONFLICT (name)
          DO UPDATE SET world=EXCLUDED.world, level=EXCLUDED.level
          """;
        try{
            Db.exec(sql, ps->{
                ps.setString(1,p.getName());
                ps.setInt   (2,world);
                ps.setInt   (3,level);
            });
        }catch(Exception e){ throw new RuntimeException(e); }
    }
}

import java.sql.*;
import java.util.function.Consumer;

/** Very small JDBC helper (single connection, no pool). */
public class Db {
    private static Connection conn;

    private Db() {}

    public static Connection conn() throws SQLException {
        if (conn == null || conn.isClosed()) {
            String url  = System.getenv().getOrDefault(
                            "JDBC_URL",
                            "jdbc:postgresql://localhost:5432/supermathio");
            String usr  = System.getenv().getOrDefault("JDBC_USER", "postgres");
            String pw   = System.getenv().getOrDefault("JDBC_PW",   "postgres");
            conn = DriverManager.getConnection(url, usr, pw);
        }
        return conn;
    }

    /* simple SELECT helper */
    public static <T> T query(String sql,
                              Consumer<PreparedStatement> bind,
                              RowMapper<T> map) throws SQLException {
        try (PreparedStatement ps = conn().prepareStatement(sql)) {
            bind.accept(ps);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? map.map(rs) : null;
            }
        }
    }

    /* simple INSERT / UPDATE */
    public static int exec(String sql,
                           Consumer<PreparedStatement> bind) throws SQLException {
        try (PreparedStatement ps = conn().prepareStatement(sql)) {
            bind.accept(ps);
            return ps.executeUpdate();
        }
    }

    /* functional interface for mapping a single row */
    interface RowMapper<T> { T map(ResultSet rs) throws SQLException; }
}

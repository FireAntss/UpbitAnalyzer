package fireants.BE.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = {"trades", "account", "boards", "comments"})
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String username;
    private String password;
    private String nickname;
    private String role;
    private String profile;

//    public List<String> getRoleList() {
//        if (this.role.length() > 0) {
//            return Arrays.asList(this.role.split(","));
//        }
//        return new ArrayList<>();
//    }

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Trade> trades = new ArrayList<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private Account account;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Board> boards = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Comment> comments = new ArrayList<>();
}

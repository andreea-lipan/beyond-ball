package diss.beyondballbe.model.accounts;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "user_account")
public abstract class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_account_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(unique = true, name = "username")
    private String username;

    @Column(nullable = false)
    private String password;
}

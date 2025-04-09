package diss.beyondballbe.persistence;

import diss.beyondballbe.model.accounts.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    boolean existsByUsername(String username);
    Optional<UserAccount> findUserByUsername(String username);
    Optional<UserAccount> findUserByUsernameAndPassword(String username, String password);
}

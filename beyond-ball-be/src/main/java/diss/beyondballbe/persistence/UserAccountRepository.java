package diss.beyondballbe.persistence;

import diss.beyondballbe.model.accounts.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findUserByEmail(String email);
    Optional<UserAccount> findUserByEmailAndPassword(String email, String password);
}

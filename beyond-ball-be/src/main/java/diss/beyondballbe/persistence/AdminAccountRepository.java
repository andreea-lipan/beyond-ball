package diss.beyondballbe.persistence;

import diss.beyondballbe.model.accounts.AdminAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminAccountRepository extends JpaRepository<AdminAccount, Long> {
    boolean existsByUsername(String username);
}

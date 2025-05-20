package diss.beyondballbe.persistence;

import diss.beyondballbe.model.accounts.PlayerAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerAccountRepository extends JpaRepository<PlayerAccount, Long> {
    Optional<PlayerAccount> findByFirstnameAndLastnameAndTeamId(String firstName, String lastName, Long teamId);
}

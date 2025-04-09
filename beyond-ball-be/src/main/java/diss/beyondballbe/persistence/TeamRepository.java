package diss.beyondballbe.persistence;

import diss.beyondballbe.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {

}

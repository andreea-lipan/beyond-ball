package diss.beyondballbe.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component("authValidator")
public class AuthValidator {

    public boolean belongsToTeam(Long teamId) {
        Object details = SecurityContextHolder.getContext().getAuthentication().getDetails();
        return (details instanceof Long) && Objects.equals(teamId, (Long) details);
    }

}

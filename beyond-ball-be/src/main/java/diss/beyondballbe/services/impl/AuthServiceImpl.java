package diss.beyondballbe.services.impl;

import diss.beyondballbe.persistence.UserAccountRepository;
import diss.beyondballbe.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
     @Autowired
     private UserAccountRepository userAccountRepository;

    // todo add the needed functions
}

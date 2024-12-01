package com.auca.GarageApplication.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class NewPassword {

    @GetMapping("/newPassword")
    public String New(){
        return "newPassword";
    }

    @GetMapping("/resetPassword")
    public String Reset(){
        return "resetPassword";
    }
    
}

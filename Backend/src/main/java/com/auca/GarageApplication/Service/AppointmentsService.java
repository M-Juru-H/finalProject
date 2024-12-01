package com.auca.GarageApplication.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auca.GarageApplication.Model.Appointments;
import com.auca.GarageApplication.Repository.AppointmentsRepo;

@Service
public class AppointmentsService {

    @Autowired
    private AppointmentsRepo customerRepository;

    public Appointments saveCustomer(Appointments customer) {
        return customerRepository.save(customer);
    }
    

    public List<Appointments> getAllCustomers() {
        return customerRepository.findAll();
    }

    public void deleteCustomer(int id) {
        customerRepository.deleteById(id);
    }
}


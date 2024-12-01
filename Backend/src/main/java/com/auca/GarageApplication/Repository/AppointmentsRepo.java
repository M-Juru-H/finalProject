package com.auca.GarageApplication.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.auca.GarageApplication.Model.Appointments;

@Repository
public interface AppointmentsRepo extends JpaRepository<Appointments, Integer> {

    
}

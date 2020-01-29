package at.fhv.ubertwo.repository;

import at.fhv.ubertwo.domain.Car;
import at.fhv.ubertwo.domain.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Car entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

}

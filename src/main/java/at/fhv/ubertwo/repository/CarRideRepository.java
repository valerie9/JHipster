package at.fhv.ubertwo.repository;

import at.fhv.ubertwo.domain.CarRide;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CarRide entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarRideRepository extends JpaRepository<CarRide, Long> {

}

package at.fhv.ubertwo.repository;

import at.fhv.ubertwo.domain.TaxiOffice;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TaxiOffice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaxiOfficeRepository extends JpaRepository<TaxiOffice, Long> {

}

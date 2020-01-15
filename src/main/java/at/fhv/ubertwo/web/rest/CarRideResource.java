package at.fhv.ubertwo.web.rest;

import at.fhv.ubertwo.domain.CarRide;
import at.fhv.ubertwo.repository.CarRideRepository;
import at.fhv.ubertwo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link at.fhv.ubertwo.domain.CarRide}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CarRideResource {

    private final Logger log = LoggerFactory.getLogger(CarRideResource.class);

    private static final String ENTITY_NAME = "carRide";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CarRideRepository carRideRepository;

    public CarRideResource(CarRideRepository carRideRepository) {
        this.carRideRepository = carRideRepository;
    }

    /**
     * {@code POST  /car-rides} : Create a new carRide.
     *
     * @param carRide the carRide to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new carRide, or with status {@code 400 (Bad Request)} if the carRide has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/car-rides")
    public ResponseEntity<CarRide> createCarRide(@RequestBody CarRide carRide) throws URISyntaxException {
        log.debug("REST request to save CarRide : {}", carRide);
        if (carRide.getId() != null) {
            throw new BadRequestAlertException("A new carRide cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CarRide result = carRideRepository.save(carRide);
        return ResponseEntity.created(new URI("/api/car-rides/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /car-rides} : Updates an existing carRide.
     *
     * @param carRide the carRide to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated carRide,
     * or with status {@code 400 (Bad Request)} if the carRide is not valid,
     * or with status {@code 500 (Internal Server Error)} if the carRide couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/car-rides")
    public ResponseEntity<CarRide> updateCarRide(@RequestBody CarRide carRide) throws URISyntaxException {
        log.debug("REST request to update CarRide : {}", carRide);
        if (carRide.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CarRide result = carRideRepository.save(carRide);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, carRide.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /car-rides} : get all the carRides.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of carRides in body.
     */
    @GetMapping("/car-rides")
    public List<CarRide> getAllCarRides() {
        log.debug("REST request to get all CarRides");
        return carRideRepository.findAll();
    }

    /**
     * {@code GET  /car-rides/:id} : get the "id" carRide.
     *
     * @param id the id of the carRide to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the carRide, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/car-rides/{id}")
    public ResponseEntity<CarRide> getCarRide(@PathVariable Long id) {
        log.debug("REST request to get CarRide : {}", id);
        Optional<CarRide> carRide = carRideRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(carRide);
    }

    /**
     * {@code DELETE  /car-rides/:id} : delete the "id" carRide.
     *
     * @param id the id of the carRide to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/car-rides/{id}")
    public ResponseEntity<Void> deleteCarRide(@PathVariable Long id) {
        log.debug("REST request to delete CarRide : {}", id);
        carRideRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

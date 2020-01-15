package at.fhv.ubertwo.web.rest;

import at.fhv.ubertwo.domain.TaxiOffice;
import at.fhv.ubertwo.repository.TaxiOfficeRepository;
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
 * REST controller for managing {@link at.fhv.ubertwo.domain.TaxiOffice}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TaxiOfficeResource {

    private final Logger log = LoggerFactory.getLogger(TaxiOfficeResource.class);

    private static final String ENTITY_NAME = "taxiOffice";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TaxiOfficeRepository taxiOfficeRepository;

    public TaxiOfficeResource(TaxiOfficeRepository taxiOfficeRepository) {
        this.taxiOfficeRepository = taxiOfficeRepository;
    }

    /**
     * {@code POST  /taxi-offices} : Create a new taxiOffice.
     *
     * @param taxiOffice the taxiOffice to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new taxiOffice, or with status {@code 400 (Bad Request)} if the taxiOffice has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/taxi-offices")
    public ResponseEntity<TaxiOffice> createTaxiOffice(@RequestBody TaxiOffice taxiOffice) throws URISyntaxException {
        log.debug("REST request to save TaxiOffice : {}", taxiOffice);
        if (taxiOffice.getId() != null) {
            throw new BadRequestAlertException("A new taxiOffice cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaxiOffice result = taxiOfficeRepository.save(taxiOffice);
        return ResponseEntity.created(new URI("/api/taxi-offices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /taxi-offices} : Updates an existing taxiOffice.
     *
     * @param taxiOffice the taxiOffice to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taxiOffice,
     * or with status {@code 400 (Bad Request)} if the taxiOffice is not valid,
     * or with status {@code 500 (Internal Server Error)} if the taxiOffice couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/taxi-offices")
    public ResponseEntity<TaxiOffice> updateTaxiOffice(@RequestBody TaxiOffice taxiOffice) throws URISyntaxException {
        log.debug("REST request to update TaxiOffice : {}", taxiOffice);
        if (taxiOffice.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TaxiOffice result = taxiOfficeRepository.save(taxiOffice);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, taxiOffice.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /taxi-offices} : get all the taxiOffices.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of taxiOffices in body.
     */
    @GetMapping("/taxi-offices")
    public List<TaxiOffice> getAllTaxiOffices() {
        log.debug("REST request to get all TaxiOffices");
        return taxiOfficeRepository.findAll();
    }

    /**
     * {@code GET  /taxi-offices/:id} : get the "id" taxiOffice.
     *
     * @param id the id of the taxiOffice to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the taxiOffice, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/taxi-offices/{id}")
    public ResponseEntity<TaxiOffice> getTaxiOffice(@PathVariable Long id) {
        log.debug("REST request to get TaxiOffice : {}", id);
        Optional<TaxiOffice> taxiOffice = taxiOfficeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(taxiOffice);
    }

    /**
     * {@code DELETE  /taxi-offices/:id} : delete the "id" taxiOffice.
     *
     * @param id the id of the taxiOffice to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/taxi-offices/{id}")
    public ResponseEntity<Void> deleteTaxiOffice(@PathVariable Long id) {
        log.debug("REST request to delete TaxiOffice : {}", id);
        taxiOfficeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}

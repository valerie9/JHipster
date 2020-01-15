package at.fhv.ubertwo.web.rest;

import at.fhv.ubertwo.UberTwoApp;
import at.fhv.ubertwo.domain.TaxiOffice;
import at.fhv.ubertwo.repository.TaxiOfficeRepository;
import at.fhv.ubertwo.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static at.fhv.ubertwo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TaxiOfficeResource} REST controller.
 */
@SpringBootTest(classes = UberTwoApp.class)
public class TaxiOfficeResourceIT {

    private static final String DEFAULT_TOWN = "AAAAAAAAAA";
    private static final String UPDATED_TOWN = "BBBBBBBBBB";

    @Autowired
    private TaxiOfficeRepository taxiOfficeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTaxiOfficeMockMvc;

    private TaxiOffice taxiOffice;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TaxiOfficeResource taxiOfficeResource = new TaxiOfficeResource(taxiOfficeRepository);
        this.restTaxiOfficeMockMvc = MockMvcBuilders.standaloneSetup(taxiOfficeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaxiOffice createEntity(EntityManager em) {
        TaxiOffice taxiOffice = new TaxiOffice()
            .town(DEFAULT_TOWN);
        return taxiOffice;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaxiOffice createUpdatedEntity(EntityManager em) {
        TaxiOffice taxiOffice = new TaxiOffice()
            .town(UPDATED_TOWN);
        return taxiOffice;
    }

    @BeforeEach
    public void initTest() {
        taxiOffice = createEntity(em);
    }

    @Test
    @Transactional
    public void createTaxiOffice() throws Exception {
        int databaseSizeBeforeCreate = taxiOfficeRepository.findAll().size();

        // Create the TaxiOffice
        restTaxiOfficeMockMvc.perform(post("/api/taxi-offices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taxiOffice)))
            .andExpect(status().isCreated());

        // Validate the TaxiOffice in the database
        List<TaxiOffice> taxiOfficeList = taxiOfficeRepository.findAll();
        assertThat(taxiOfficeList).hasSize(databaseSizeBeforeCreate + 1);
        TaxiOffice testTaxiOffice = taxiOfficeList.get(taxiOfficeList.size() - 1);
        assertThat(testTaxiOffice.getTown()).isEqualTo(DEFAULT_TOWN);
    }

    @Test
    @Transactional
    public void createTaxiOfficeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = taxiOfficeRepository.findAll().size();

        // Create the TaxiOffice with an existing ID
        taxiOffice.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaxiOfficeMockMvc.perform(post("/api/taxi-offices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taxiOffice)))
            .andExpect(status().isBadRequest());

        // Validate the TaxiOffice in the database
        List<TaxiOffice> taxiOfficeList = taxiOfficeRepository.findAll();
        assertThat(taxiOfficeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTaxiOffices() throws Exception {
        // Initialize the database
        taxiOfficeRepository.saveAndFlush(taxiOffice);

        // Get all the taxiOfficeList
        restTaxiOfficeMockMvc.perform(get("/api/taxi-offices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taxiOffice.getId().intValue())))
            .andExpect(jsonPath("$.[*].town").value(hasItem(DEFAULT_TOWN)));
    }
    
    @Test
    @Transactional
    public void getTaxiOffice() throws Exception {
        // Initialize the database
        taxiOfficeRepository.saveAndFlush(taxiOffice);

        // Get the taxiOffice
        restTaxiOfficeMockMvc.perform(get("/api/taxi-offices/{id}", taxiOffice.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(taxiOffice.getId().intValue()))
            .andExpect(jsonPath("$.town").value(DEFAULT_TOWN));
    }

    @Test
    @Transactional
    public void getNonExistingTaxiOffice() throws Exception {
        // Get the taxiOffice
        restTaxiOfficeMockMvc.perform(get("/api/taxi-offices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTaxiOffice() throws Exception {
        // Initialize the database
        taxiOfficeRepository.saveAndFlush(taxiOffice);

        int databaseSizeBeforeUpdate = taxiOfficeRepository.findAll().size();

        // Update the taxiOffice
        TaxiOffice updatedTaxiOffice = taxiOfficeRepository.findById(taxiOffice.getId()).get();
        // Disconnect from session so that the updates on updatedTaxiOffice are not directly saved in db
        em.detach(updatedTaxiOffice);
        updatedTaxiOffice
            .town(UPDATED_TOWN);

        restTaxiOfficeMockMvc.perform(put("/api/taxi-offices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTaxiOffice)))
            .andExpect(status().isOk());

        // Validate the TaxiOffice in the database
        List<TaxiOffice> taxiOfficeList = taxiOfficeRepository.findAll();
        assertThat(taxiOfficeList).hasSize(databaseSizeBeforeUpdate);
        TaxiOffice testTaxiOffice = taxiOfficeList.get(taxiOfficeList.size() - 1);
        assertThat(testTaxiOffice.getTown()).isEqualTo(UPDATED_TOWN);
    }

    @Test
    @Transactional
    public void updateNonExistingTaxiOffice() throws Exception {
        int databaseSizeBeforeUpdate = taxiOfficeRepository.findAll().size();

        // Create the TaxiOffice

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaxiOfficeMockMvc.perform(put("/api/taxi-offices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taxiOffice)))
            .andExpect(status().isBadRequest());

        // Validate the TaxiOffice in the database
        List<TaxiOffice> taxiOfficeList = taxiOfficeRepository.findAll();
        assertThat(taxiOfficeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTaxiOffice() throws Exception {
        // Initialize the database
        taxiOfficeRepository.saveAndFlush(taxiOffice);

        int databaseSizeBeforeDelete = taxiOfficeRepository.findAll().size();

        // Delete the taxiOffice
        restTaxiOfficeMockMvc.perform(delete("/api/taxi-offices/{id}", taxiOffice.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TaxiOffice> taxiOfficeList = taxiOfficeRepository.findAll();
        assertThat(taxiOfficeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

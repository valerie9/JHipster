package at.fhv.ubertwo.web.rest;

import at.fhv.ubertwo.UberTwoApp;
import at.fhv.ubertwo.domain.CarRide;
import at.fhv.ubertwo.repository.CarRideRepository;
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
import java.time.Duration;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static at.fhv.ubertwo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CarRideResource} REST controller.
 */
@SpringBootTest(classes = UberTwoApp.class)
public class CarRideResourceIT {

    private static final LocalDate DEFAULT_START_TIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_TIME = LocalDate.now(ZoneId.systemDefault());

    private static final Duration DEFAULT_DURATION = Duration.ofHours(6);
    private static final Duration UPDATED_DURATION = Duration.ofHours(12);

    private static final Double DEFAULT_DISTANCE = 1D;
    private static final Double UPDATED_DISTANCE = 2D;

    private static final String DEFAULT_END_PLACE = "AAAAAAAAAA";
    private static final String UPDATED_END_PLACE = "BBBBBBBBBB";

    private static final String DEFAULT_START_PLACE = "AAAAAAAAAA";
    private static final String UPDATED_START_PLACE = "BBBBBBBBBB";

    private static final Double DEFAULT_COST = 1D;
    private static final Double UPDATED_COST = 2D;

    @Autowired
    private CarRideRepository carRideRepository;

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

    private MockMvc restCarRideMockMvc;

    private CarRide carRide;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CarRideResource carRideResource = new CarRideResource(carRideRepository);
        this.restCarRideMockMvc = MockMvcBuilders.standaloneSetup(carRideResource)
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
    public static CarRide createEntity(EntityManager em) {
        CarRide carRide = new CarRide()
            .startTime(DEFAULT_START_TIME)
            .duration(DEFAULT_DURATION)
            .distance(DEFAULT_DISTANCE)
            .endPlace(DEFAULT_END_PLACE)
            .startPlace(DEFAULT_START_PLACE)
            .cost(DEFAULT_COST);
        return carRide;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CarRide createUpdatedEntity(EntityManager em) {
        CarRide carRide = new CarRide()
            .startTime(UPDATED_START_TIME)
            .duration(UPDATED_DURATION)
            .distance(UPDATED_DISTANCE)
            .endPlace(UPDATED_END_PLACE)
            .startPlace(UPDATED_START_PLACE)
            .cost(UPDATED_COST);
        return carRide;
    }

    @BeforeEach
    public void initTest() {
        carRide = createEntity(em);
    }

    @Test
    @Transactional
    public void createCarRide() throws Exception {
        int databaseSizeBeforeCreate = carRideRepository.findAll().size();

        // Create the CarRide
        restCarRideMockMvc.perform(post("/api/car-rides")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carRide)))
            .andExpect(status().isCreated());

        // Validate the CarRide in the database
        List<CarRide> carRideList = carRideRepository.findAll();
        assertThat(carRideList).hasSize(databaseSizeBeforeCreate + 1);
        CarRide testCarRide = carRideList.get(carRideList.size() - 1);
        assertThat(testCarRide.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testCarRide.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testCarRide.getDistance()).isEqualTo(DEFAULT_DISTANCE);
        assertThat(testCarRide.getEndPlace()).isEqualTo(DEFAULT_END_PLACE);
        assertThat(testCarRide.getStartPlace()).isEqualTo(DEFAULT_START_PLACE);
        assertThat(testCarRide.getCost()).isEqualTo(DEFAULT_COST);
    }

    @Test
    @Transactional
    public void createCarRideWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carRideRepository.findAll().size();

        // Create the CarRide with an existing ID
        carRide.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarRideMockMvc.perform(post("/api/car-rides")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carRide)))
            .andExpect(status().isBadRequest());

        // Validate the CarRide in the database
        List<CarRide> carRideList = carRideRepository.findAll();
        assertThat(carRideList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCarRides() throws Exception {
        // Initialize the database
        carRideRepository.saveAndFlush(carRide);

        // Get all the carRideList
        restCarRideMockMvc.perform(get("/api/car-rides?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carRide.getId().intValue())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION.toString())))
            .andExpect(jsonPath("$.[*].distance").value(hasItem(DEFAULT_DISTANCE.doubleValue())))
            .andExpect(jsonPath("$.[*].endPlace").value(hasItem(DEFAULT_END_PLACE)))
            .andExpect(jsonPath("$.[*].startPlace").value(hasItem(DEFAULT_START_PLACE)))
            .andExpect(jsonPath("$.[*].cost").value(hasItem(DEFAULT_COST.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getCarRide() throws Exception {
        // Initialize the database
        carRideRepository.saveAndFlush(carRide);

        // Get the carRide
        restCarRideMockMvc.perform(get("/api/car-rides/{id}", carRide.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(carRide.getId().intValue()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.toString()))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION.toString()))
            .andExpect(jsonPath("$.distance").value(DEFAULT_DISTANCE.doubleValue()))
            .andExpect(jsonPath("$.endPlace").value(DEFAULT_END_PLACE))
            .andExpect(jsonPath("$.startPlace").value(DEFAULT_START_PLACE))
            .andExpect(jsonPath("$.cost").value(DEFAULT_COST.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCarRide() throws Exception {
        // Get the carRide
        restCarRideMockMvc.perform(get("/api/car-rides/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCarRide() throws Exception {
        // Initialize the database
        carRideRepository.saveAndFlush(carRide);

        int databaseSizeBeforeUpdate = carRideRepository.findAll().size();

        // Update the carRide
        CarRide updatedCarRide = carRideRepository.findById(carRide.getId()).get();
        // Disconnect from session so that the updates on updatedCarRide are not directly saved in db
        em.detach(updatedCarRide);
        updatedCarRide
            .startTime(UPDATED_START_TIME)
            .duration(UPDATED_DURATION)
            .distance(UPDATED_DISTANCE)
            .endPlace(UPDATED_END_PLACE)
            .startPlace(UPDATED_START_PLACE)
            .cost(UPDATED_COST);

        restCarRideMockMvc.perform(put("/api/car-rides")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCarRide)))
            .andExpect(status().isOk());

        // Validate the CarRide in the database
        List<CarRide> carRideList = carRideRepository.findAll();
        assertThat(carRideList).hasSize(databaseSizeBeforeUpdate);
        CarRide testCarRide = carRideList.get(carRideList.size() - 1);
        assertThat(testCarRide.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testCarRide.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testCarRide.getDistance()).isEqualTo(UPDATED_DISTANCE);
        assertThat(testCarRide.getEndPlace()).isEqualTo(UPDATED_END_PLACE);
        assertThat(testCarRide.getStartPlace()).isEqualTo(UPDATED_START_PLACE);
        assertThat(testCarRide.getCost()).isEqualTo(UPDATED_COST);
    }

    @Test
    @Transactional
    public void updateNonExistingCarRide() throws Exception {
        int databaseSizeBeforeUpdate = carRideRepository.findAll().size();

        // Create the CarRide

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarRideMockMvc.perform(put("/api/car-rides")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carRide)))
            .andExpect(status().isBadRequest());

        // Validate the CarRide in the database
        List<CarRide> carRideList = carRideRepository.findAll();
        assertThat(carRideList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCarRide() throws Exception {
        // Initialize the database
        carRideRepository.saveAndFlush(carRide);

        int databaseSizeBeforeDelete = carRideRepository.findAll().size();

        // Delete the carRide
        restCarRideMockMvc.perform(delete("/api/car-rides/{id}", carRide.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CarRide> carRideList = carRideRepository.findAll();
        assertThat(carRideList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

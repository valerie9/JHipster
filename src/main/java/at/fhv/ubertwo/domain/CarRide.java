package at.fhv.ubertwo.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.Duration;

/**
 * A CarRide.
 */
@Entity
@Table(name = "car_ride")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CarRide implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_time")
    private LocalDate startTime;

    @Column(name = "duration")
    private Duration duration;

    @Column(name = "distance")
    private Double distance;

    @Column(name = "end_place")
    private String endPlace;

    @Column(name = "start_place")
    private String startPlace;

    @Column(name = "cost")
    private Double cost;

    @OneToOne
    @JoinColumn(unique = true)
    private Driver driver;

    @OneToOne
    @JoinColumn(unique = true)
    private Car car;

    @ManyToOne
    @JsonIgnoreProperties("carRides")
    private TaxiOffice taxiOffice;

    @ManyToOne
    @JsonIgnoreProperties("carRides")
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStartTime() {
        return startTime;
    }

    public CarRide startTime(LocalDate startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(LocalDate startTime) {
        this.startTime = startTime;
    }

    public Duration getDuration() {
        return duration;
    }

    public CarRide duration(Duration duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public Double getDistance() {
        return distance;
    }

    public CarRide distance(Double distance) {
        this.distance = distance;
        return this;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

    public String getEndPlace() {
        return endPlace;
    }

    public CarRide endPlace(String endPlace) {
        this.endPlace = endPlace;
        return this;
    }

    public void setEndPlace(String endPlace) {
        this.endPlace = endPlace;
    }

    public String getStartPlace() {
        return startPlace;
    }

    public CarRide startPlace(String startPlace) {
        this.startPlace = startPlace;
        return this;
    }

    public void setStartPlace(String startPlace) {
        this.startPlace = startPlace;
    }

    public Double getCost() {
        return cost;
    }

    public CarRide cost(Double cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public Driver getDriver() {
        return driver;
    }

    public CarRide driver(Driver driver) {
        this.driver = driver;
        return this;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public Car getCar() {
        return car;
    }

    public CarRide car(Car car) {
        this.car = car;
        return this;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public TaxiOffice getTaxiOffice() {
        return taxiOffice;
    }

    public CarRide taxiOffice(TaxiOffice taxiOffice) {
        this.taxiOffice = taxiOffice;
        return this;
    }

    public void setTaxiOffice(TaxiOffice taxiOffice) {
        this.taxiOffice = taxiOffice;
    }

    public Customer getCustomer() {
        return customer;
    }

    public CarRide customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CarRide)) {
            return false;
        }
        return id != null && id.equals(((CarRide) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CarRide{" +
            "id=" + getId() +
            ", startTime='" + getStartTime() + "'" +
            ", duration='" + getDuration() + "'" +
            ", distance=" + getDistance() +
            ", endPlace='" + getEndPlace() + "'" +
            ", startPlace='" + getStartPlace() + "'" +
            ", cost=" + getCost() +
            "}";
    }
}

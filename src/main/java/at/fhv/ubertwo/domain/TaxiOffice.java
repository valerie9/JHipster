package at.fhv.ubertwo.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A TaxiOffice.
 */
@Entity
@Table(name = "taxi_office")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TaxiOffice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "town")
    private String town;

    @OneToMany(mappedBy = "taxiOffice")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Car> cars = new HashSet<>();

    @OneToMany(mappedBy = "taxiOffice")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Driver> drivers = new HashSet<>();

    @OneToMany(mappedBy = "taxiOffice")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CarRide> carRides = new HashSet<>();

    @OneToMany(mappedBy = "taxiOffice")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Customer> customers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTown() {
        return town;
    }

    public TaxiOffice town(String town) {
        this.town = town;
        return this;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public Set<Car> getCars() {
        return cars;
    }

    public TaxiOffice cars(Set<Car> cars) {
        this.cars = cars;
        return this;
    }

    public TaxiOffice addCar(Car car) {
        this.cars.add(car);
        car.setTaxiOffice(this);
        return this;
    }

    public TaxiOffice removeCar(Car car) {
        this.cars.remove(car);
        car.setTaxiOffice(null);
        return this;
    }

    public void setCars(Set<Car> cars) {
        this.cars = cars;
    }

    public Set<Driver> getDrivers() {
        return drivers;
    }

    public TaxiOffice drivers(Set<Driver> drivers) {
        this.drivers = drivers;
        return this;
    }

    public TaxiOffice addDriver(Driver driver) {
        this.drivers.add(driver);
        driver.setTaxiOffice(this);
        return this;
    }

    public TaxiOffice removeDriver(Driver driver) {
        this.drivers.remove(driver);
        driver.setTaxiOffice(null);
        return this;
    }

    public void setDrivers(Set<Driver> drivers) {
        this.drivers = drivers;
    }

    public Set<CarRide> getCarRides() {
        return carRides;
    }

    public TaxiOffice carRides(Set<CarRide> carRides) {
        this.carRides = carRides;
        return this;
    }

    public TaxiOffice addCarRide(CarRide carRide) {
        this.carRides.add(carRide);
        carRide.setTaxiOffice(this);
        return this;
    }

    public TaxiOffice removeCarRide(CarRide carRide) {
        this.carRides.remove(carRide);
        carRide.setTaxiOffice(null);
        return this;
    }

    public void setCarRides(Set<CarRide> carRides) {
        this.carRides = carRides;
    }

    public Set<Customer> getCustomers() {
        return customers;
    }

    public TaxiOffice customers(Set<Customer> customers) {
        this.customers = customers;
        return this;
    }

    public TaxiOffice addCustomer(Customer customer) {
        this.customers.add(customer);
        customer.setTaxiOffice(this);
        return this;
    }

    public TaxiOffice removeCustomer(Customer customer) {
        this.customers.remove(customer);
        customer.setTaxiOffice(null);
        return this;
    }

    public void setCustomers(Set<Customer> customers) {
        this.customers = customers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TaxiOffice)) {
            return false;
        }
        return id != null && id.equals(((TaxiOffice) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TaxiOffice{" +
            "id=" + getId() +
            ", town='" + getTown() + "'" +
            "}";
    }
}

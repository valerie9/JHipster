package at.fhv.ubertwo.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Car.
 */
@Entity
@Table(name = "car")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Car implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "license_plate")
    private String licensePlate;

    @Column(name = "name")
    private String name;

    @Column(name = "seats")
    private Integer seats;

    @OneToOne(mappedBy = "car")
    @JsonIgnore
    private CarRide carRide;

    @ManyToOne
    @JsonIgnoreProperties("cars")
    private TaxiOffice taxiOffice;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public Car licensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
        return this;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getName() {
        return name;
    }

    public Car name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSeats() {
        return seats;
    }

    public Car seats(Integer seats) {
        this.seats = seats;
        return this;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }

    public CarRide getCarRide() {
        return carRide;
    }

    public Car carRide(CarRide carRide) {
        this.carRide = carRide;
        return this;
    }

    public void setCarRide(CarRide carRide) {
        this.carRide = carRide;
    }

    public TaxiOffice getTaxiOffice() {
        return taxiOffice;
    }

    public Car taxiOffice(TaxiOffice taxiOffice) {
        this.taxiOffice = taxiOffice;
        return this;
    }

    public void setTaxiOffice(TaxiOffice taxiOffice) {
        this.taxiOffice = taxiOffice;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Car)) {
            return false;
        }
        return id != null && id.equals(((Car) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Car{" +
            "id=" + getId() +
            ", licensePlate='" + getLicensePlate() + "'" +
            ", name='" + getName() + "'" +
            ", seats=" + getSeats() +
            "}";
    }
}

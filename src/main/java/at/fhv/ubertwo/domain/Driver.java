package at.fhv.ubertwo.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Driver.
 */
@Entity
@Table(name = "driver")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Driver implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "age")
    private String age;

    @Column(name = "salary")
    private Double salary;

    @OneToOne(mappedBy = "driver")
    @JsonIgnore
    private CarRide carRide;

    @ManyToOne
    @JsonIgnoreProperties("drivers")
    private TaxiOffice taxiOffice;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Driver name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public Driver age(String age) {
        this.age = age;
        return this;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public Double getSalary() {
        return salary;
    }

    public Driver salary(Double salary) {
        this.salary = salary;
        return this;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public CarRide getCarRide() {
        return carRide;
    }

    public Driver carRide(CarRide carRide) {
        this.carRide = carRide;
        return this;
    }

    public void setCarRide(CarRide carRide) {
        this.carRide = carRide;
    }

    public TaxiOffice getTaxiOffice() {
        return taxiOffice;
    }

    public Driver taxiOffice(TaxiOffice taxiOffice) {
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
        if (!(o instanceof Driver)) {
            return false;
        }
        return id != null && id.equals(((Driver) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Driver{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", age='" + getAge() + "'" +
            ", salary=" + getSalary() +
            "}";
    }
}

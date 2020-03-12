<template>
  <div>
    <b-container class="my-5">
      <h1>Contacto</h1>
      <b-form class="mt-4">
        <b-form-group label="Tipo">
          <b-button-group>
            <b-button
              :variant="contact.isPerson ? 'primary' : 'outline-primary'"
              @click="contact.isPerson = true"
            >
              Persona
            </b-button>
            <b-button
              :variant="!contact.isPerson ? 'primary' : 'outline-primary'"
              @click="contact.isPerson = false"
            >
              Empresa
            </b-button>
          </b-button-group>
        </b-form-group>
        <b-form-group label="Nombre">
          <b-form-input
            v-model="contact.name"
            placeholder="Ingrese el nombre del contacto"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Tipo de documento">
          <b-form-radio-group
            v-model="contact.idType"
            name="radio-sub-component"
          >
            <b-form-radio value="rut">RUT</b-form-radio>
            <b-form-radio v-if="contact.isPerson" value="passport">
              Pasaporte
            </b-form-radio>
            <b-form-radio v-if="contact.isPerson" value="foreign-id">
              Tarjeta de identidad extranjera
            </b-form-radio>
            <b-form-radio v-if="!contact.isPerson" value="foreign-company-num">
              Número de empresa extranjera
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <b-form-group>
          <template v-slot:label>
            <span v-if="contact.idType === null">Número de documento</span>
            <span v-if="contact.idType === 'rut'">RUT</span>
            <span v-if="contact.idType === 'passport'">
              Número de pasaporte
            </span>
            <span v-if="contact.idType === 'foreign-id'">
              Número de tarjeta de identidad extranjera
            </span>
            <span v-if="contact.idType === 'foreign-company-num'">
              Número de empresa extranjera
            </span>
          </template>
          <b-form-input
            v-model="contact.idNum"
            placeholder="Ingrese el número"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Número de teléfono">
          <b-input-group>
            <b-input-group-prepend is-text>
              <b-icon icon="phone"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="contact.phone"
              type="tel"
              placeholder="Ingrese el número de teléfono del contacto"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Correo electrónico">
          <b-input-group>
            <b-input-group-prepend is-text>
              <b-icon icon="envelope"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="contact.email"
              type="email"
              placeholder="Ingrese el correo electrónico del contacto"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <!-- <h2 class="mt-4">Dirección</h2> -->
        <b-form-group label="Dirección">
          <b-input-group>
            <b-input-group-prepend is-text>
              <b-icon icon="house"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="contact.address.line1"
              placeholder="Ingrese la dirección del contacto"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Detalles de la dirección">
          <b-form-input
            v-model="contact.address.line2"
            placeholder="Ingrese los detalles de la dirección (departamento, bloque etc.)"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Ciudad">
          <b-form-input
            v-model="contact.address.city"
            placeholder="Ingrese la ciudad"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="País">
          <b-form-input
            v-model="contact.address.country"
            placeholder="Ingrese el país"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" class="mt-3" size="lg" variant="success">
          Guardar
        </b-button>
      </b-form>
    </b-container>
    <b-card class="mt-3" header="Contact Form Result">
      <pre class="m-0">{{ contact }}</pre>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ContactForm extends Vue {
  contact: any = {
    isPerson: true,
    name: "",
    idType: null,
    idNum: "",
    phone: null as any,
    email: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      country: ""
    }
  };
}
</script>

<style></style>

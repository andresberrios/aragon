<template>
  <div>
    <b-container class="my-5">
      <h1>Sales</h1>
      <b-form class="mt-4">
        <b-form-group label="Tipo de Documento: ">
          <b-form-select
            v-model="sale.selectedType"
            :options="optionsType"
            required
          >
          </b-form-select>
        </b-form-group>
        <b-form-group label="Número de Documento">
          <b-form-input
            v-model="sale.documentNum"
            placeholder="Ingrese el número de documento"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Seleccione fecha">
          <b-form-datepicker
            v-model="sale.selectedDate"
            class="mb-2"
            required
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group label="Nombre del Cliente">
          <b-form-input
            v-model="sale.clientName"
            placeholder="Ingrese el nombre del cliente"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="RUT del Cliente">
          <b-form-input
            v-model="sale.clientRut"
            placeholder="Ingrese el RUT de cliente"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Venta Neta">
          <b-input-group size="md" prepend="$">
            <b-form-input
              v-model="sale.netSale"
              type="number"
              placeholder="Ingrese el valor de venta neta"
              required
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="IVA">
          <b-input-group size="md" append="%">
            <b-form-input
              v-model="sale.tax"
              type="number"
              placeholder="Ingrese el porcentaje del IVA"
              required
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Total Factura">
          <b-input-group size="md" prepend="$">
            <b-form-input
              :value="sale.netSale * (sale.tax / 100 + 1)"
              type="number"
              placeholder="Total factura"
              disabled
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Origen: ">
          <b-form-select
            v-model="sale.selectedSource"
            :options="optionsSource"
            required
          >
          </b-form-select>
        </b-form-group>
        <b-button class="mt-3" size="lg" variant="success">Enviar</b-button>
      </b-form>
      <pre class="bg-warning mt-5 p-4">{{ sale }}</pre>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component()
export default class SalesForm extends Vue {
  sale: any = {
    documentNum: "",
    voucherNum: "",
    selectedType: null,
    selectedDate: "",
    clientName: "",
    clientRut: "",
    netSale: "",
    tax: "",
    totalValue: "",
    selectedSource: null
  };
  optionsType: any = [
    {
      value: null,
      text: "-- Seleccione el tipo de documento --",
      disabled: true
    },
    { value: "voucher", text: "Voucher" },
    { value: "boleta", text: "Boleta" },
    { value: "factura-elect", text: "Factura Electronica" },
    {
      value: "factura-export-elect",
      text: "Factura Exportacion Electronica"
    },
    { value: "factura-export", text: "Factura Exportacion" },
    { value: "nota-credito-elect", text: "Nota de Credito Electronica" },
    { value: "nota-credito-export", text: "Nota de Credito Exportacion" }
  ];
  optionsSource: any = [
    { value: null, text: "-- Seleccione el origen de reserva --" },
    { value: "booking", text: "Booking" },
    { value: "cocha", text: "Cocha" },
    { value: "expedia", text: "Expedia" },
    { value: "despegar", text: "Despegar" },
    { value: "recomendacion", text: "Recomendación" },
    { value: "walk-in", text: "Walk-in" },
    { value: "sitio-web", text: "Sitio web" },
    { value: "anuncio", text: "Anuncio" }
  ];
}
</script>

<style></style>

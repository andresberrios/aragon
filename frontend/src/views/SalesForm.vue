<template>
  <div>
    <b-container class="my-5">
      <h1>Sales</h1>
      <b-form class="mt-4">
        <b-form-group label="Tipo de Documento: ">
          <b-form-select v-model="sale.type" :options="options.type" required>
          </b-form-select>
        </b-form-group>
        <b-form-group label="Número de Documento">
          <b-form-input
            v-model="sale.number"
            placeholder="Ingrese el número de documento"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Seleccione fecha">
          <b-form-datepicker
            v-model="sale.date"
            start-weekday="1"
            locale="es"
            v-bind="datePickerLabels"
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
              v-model="sale.net"
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
              :value="sale.net * (sale.tax / 100 + 1)"
              type="number"
              placeholder="Total factura"
              disabled
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Origen: ">
          <b-form-select
            v-model="sale.source"
            :options="options.source"
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
import { Sale } from "../interfaces/sales";
import { datePickerLabels } from "../services/i18n";

interface SelectOption {
  value: string | null;
  text: string;
  disabled?: boolean;
}

@Component
export default class SalesForm extends Vue {
  sale: Sale = {
    number: "",
    type: null as any,
    date: "",
    clientName: "",
    clientRut: "",
    net: null as any,
    tax: null as any,
    source: null as any
  };
  options: { type: SelectOption[]; source: SelectOption[] } = {
    type: [
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
    ],
    source: [
      { value: null, text: "-- Seleccione el origen de reserva --" },
      { value: "booking-com", text: "Booking.com" },
      { value: "cocha", text: "Cocha" },
      { value: "agency", text: "Agencia" },
      { value: "expedia", text: "Expedia" },
      { value: "despegar-com", text: "Despegar.com" },
      { value: "referral", text: "Referido" },
      { value: "walk-in", text: "Venta directa" },
      { value: "website", text: "Sitio web" },
      { value: "ad", text: "Anuncio" }
    ]
  };
  datePickerLabels = datePickerLabels;
}
</script>

<style></style>

<template>
  <div>
    <b-container class="my-5">
      <h1>Pagos</h1>
      <b-form class="mt-4">
        <b-form-group label="Tipo">
          <b-button-group>
            <b-button
              :variant="payment.isIncome ? 'primary' : 'outline-primary'"
              @click="payment.isIncome = true"
            >
              Entrante
            </b-button>
            <b-button
              :variant="!payment.isIncome ? 'primary' : 'outline-primary'"
              @click="payment.isIncome = false"
            >
              Saliente
            </b-button>
          </b-button-group>
        </b-form-group>
        <b-form-group label="Forma de pago:">
          <b-form-select
            v-model="payment.method"
            :options="options.method"
            required
          >
          </b-form-select>
        </b-form-group>
        <b-form-group
          v-if="payment.method === 'tarjeta-credito'"
          label="Tipo de tarjeta: "
        >
          <b-form-select
            v-model="payment.card"
            :options="options.card"
            required
          >
          </b-form-select>
        </b-form-group>
        <b-form-group label="Cantidad Pagada:">
          <b-input-group size="md" prepend="$">
            <b-form-input
              v-model.number="payment.amountOne"
              type="number"
              placeholder="Ingrese la cantidad pagada"
              required
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Numero de Voucher">
          <b-form-input
            v-model="payment.voucher"
            placeholder="Ingrese el número de voucher"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group label="Fecha del pago:">
          <b-form-datepicker
            v-model="payment.date"
            start-weekday="1"
            locale="es"
            v-bind="datePickerLabels"
            class="mb-2"
            hide-header
            required
          ></b-form-datepicker>
        </b-form-group>
        <b-button class="mt-3" size="lg" variant="success">Guardar</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Payment, Invoice } from "../interfaces/accounting";
import { SelectOption } from "../interfaces/common";
import { datePickerLabels } from "../services/i18n";

@Component
export default class PaymentsForm extends Vue {
  payment: Payment = {
    isIncome: true,
    isSplit: true,
    method: null as any,
    card: null as any,
    amount: null as any,
    voucher: "",
    date: ""
  };
  options: { method: SelectOption[]; card: SelectOption[] } = {
    method: [
      {
        value: null,
        text: "-- Seleccione la forma de pago --",
        disabled: true
      },
      { value: "efectivo-peso", text: "Efectivo Peso" },
      {
        value: "efectivo-dolar",
        text: "Efectivo Dólar"
      },
      { value: "tarjeta-debito", text: "Tarjeta Debito" },
      { value: "tarjeta-credito", text: "Tarjeta Credito" },
      { value: "cheque", text: "Cheque" },
      { value: "transfer-banco", text: "Transferencia Bancaria" },
      { value: "deposito-banco", text: "Depósito en Cuenta Bancaria" },
      { value: "web-pay", text: "Web Pay" },
      { value: "vale-vista", text: "Vale Vista" },
      { value: "nota-credito", text: "Nota de Credito" }
    ],
    card: [
      { value: null, text: "-- Seleccione tipo de tarjeta --", disabled: true },
      { value: "visa", text: "Visa" },
      { value: "master", text: "Mastercard" },
      { value: "amex", text: "American Express" },
      { value: "diners", text: "Diners" }
    ]
  };
  datePickerLabels = datePickerLabels;
}
</script>

<style></style>

<template>
  <div class="modal fade" ref="DOM">
    <div class="modal-dialog" role="dialog">
      <Form class="modal-content" v-slot="{errors}" v-on:submit="payOrder">
        <div class="modal-header">訂單編號：{{OrderStore.order.id}}</div>
        <div class="modal-body">
          <div class="row">
            <div class="col">付款方式</div>
            <div class="col">
              <Field as="select" label="" name="method" rules="required" class="form-select" v-model="payMethod" v-bind:class="{'is-invalid':errors['method']}">
                  <option disabled>請選擇</option>
                  <option value="credit-card">信用卡</option>
                  <option value="bank-account">銀行帳戶</option>
                  <option value="mobile-pay">行動支付</option>
              </Field>
              <ErrorMessage name="method" class="invalid-feedback" />
            </div>
          </div>
          <div v-if="payMethod==='credit-card'">
            <div class="row">
              <div class="col">發卡銀行</div>
              <div class="col">
                <Field label="發卡銀行" name="bank" class="form-control" type="text" rules="required"  v-bind:class="{'is-invalid':errors['bank']}"/>
                <ErrorMessage name="bank" class="invalid-feedback" />
              </div>
            </div>
            <div class="row">
              <div class="col">卡號</div>
              <div class="col">
                <Field label="卡號" name="number" class="form-control" type="tel" rules="required|numeric"  v-bind:class="{'is-invalid':errors['number']}"/>
                <ErrorMessage name="number" class="invalid-feedback" />
              </div>
            </div>
            <div class="row">
              <div class="col">持有人</div>
              <div class="col">
                <Field label="持有人" name="owner" class="form-control" type="text" rules="required" v-bind:class="{'is-invalid':errors['owner']}" />
                <ErrorMessage name="owner" class="invalid-feedback" />
              </div>
            </div>
            <div class="row">
              <div class="col"></div>
              <div class="col">
                <Field label="效期" name="valid-thru" class="form-control" type="month" rules="required" v-bind:class="{'is-invalid':errors['valid-thru']}" />
                <ErrorMessage name="valid-thru" class="invalid-feedback" />
              </div>
            </div>
            <div class="row">
              <div class="col">檢核碼</div>
              <div class="col">
                <Field label="檢核碼" name="checksum" class="form-control" type="tel" rules="required|numeric" v-bind:class="{'is-invalid':errors['checksum']}" />
                <ErrorMessage name="checksum" class="invalid-feedback" />
              </div>
            </div>
          </div>
          <div v-else-if="payMethod==='bank-account'">
            <div class="row">
              <div class="col">開戶總行</div>
              <div class="col">
                <Field label="開戶總行" name="head-office" class="form-control" type="text" rules="required" v-bind:class="{'is-invalid':errors['head-office']}" />
                <ErrorMessage name="head-office" class="invalid-feedback" />
              </div>
            </div>
            <div class="row">
              <div class="col">開戶分行</div>
              <div class="col">
                <Field label="開戶分行" name="branch" class="form-control" type="text" rules="required" v-bind:class="{'is-invalid':errors['branch']}" />
                <ErrorMessage name="branch" class="invalid-feedback" />
              </div>
            </div>
            <div class="row">
              <div class="col">帳號</div>
              <div class="col">
                <Field label="帳號" name="account" class="form-control" type="tel" rules="required|numeric" v-bind:class="{'is-invalid':errors['account']}" />
                <ErrorMessage name="account" class="invalid-feedback" />
              </div>
            </div>
            <div class="row">
              <div class="col">戶名</div>
              <div class="col">
                <Field label="戶名" name="name" class="form-control" type="text" rules="required" v-bind:class="{'is-invalid':errors['name']}" />
                <ErrorMessage name="name" class="invalid-feedback" />
              </div>
            </div>
            <div class="row">
              <div class="col">一次性密碼</div>
              <div class="col">
                <Field label="一次性密碼" name="otp" class="form-control" type="tel" rules="required|numeric" v-bind:class="{'is-invalid':errors['otp']}" />
                <ErrorMessage name="otp" class="invalid-feedback" />
              </div>
            </div>
          </div>
          <div v-else-if="payMethod==='mobile-pay'">
            <div class="row">
              <div class="col">支付服務</div>
              <div class="col">
                <div class="form-check">
                    <Field label="支付服務" name="service" class="form-check-input" type="radio" rules="required" value="linePay" v-bind:class="{'is-invalid':errors['service']}" />
                    <label class="form-check-label">Line Pay</label>
                  </div>
                  <div class="form-check">
                    <Field label="支付服務" name="service" class="form-check-input" type="radio" rules="required" value="applePay" v-bind:class="{'is-invalid':errors['service']}" />
                    <label class="form-check-label">Apple Pay</label>
                  </div>
                  <div class="form-check">
                    <Field label="支付服務" name="service" class="form-check-input" type="radio" rules="required" value="samsungPay" v-bind:class="{'is-invalid':errors['service']}" />
                    <label class="form-check-label">Samsung Pay</label>
                  </div>
                  <div class="form-check">
                    <Field label="支付服務" name="service" class="form-check-input" type="radio" rules="required" value="googlePay" v-bind:class="{'is-invalid':errors['service']}" />
                    <label class="form-check-label">Google Pay</label>
                  </div>
                  <div class="form-check">
                    <Field label="支付服務" name="service" class="form-check-input" type="radio" rules="required" value="jkopay" v-bind:class="{'is-invalid':errors['service']}" />
                    <label class="form-check-label">街口支付</label>
                  </div>
                <ErrorMessage name="service" class="invalid-feedback" />
              </div>
            </div>
            <div class="row">
              <div class="col">付款代碼</div>
              <div class="col">
                <Field label="付款代碼" name="code" class="form-control" type="tel" rules="required|numeric" v-bind:class="{'is-invalid':errors['code']}" />
                <ErrorMessage name="code" class="invalid-feedback" />
              </div>
            </div>
            <div class="row">
              <div class="col">付款密碼</div>
              <div class="col">
                <Field label="付款密碼" name="password" class="form-control" type="password" rules="required|numeric" v-bind:class="{'is-invalid':errors['password']}" />
                <ErrorMessage name="password" class="invalid-feedback" />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <input type="submit" class="btn btn-primary" value="確定" />
          <input type="reset" class="btn btn-danger" v-on:click="hide" value="取消" />
        </div>
      </Form>        
    </div>
  </div>
</template>
<script setup>
  import { Modal } from "bootstrap"
  import { onMounted, ref, watch } from "vue"
  import useOrderStore from "@/stores/orders"
  import { useForm } from "vee-validate"
  const OrderStore = useOrderStore()
  const DOM = ref(null), payMethod = ref('')
  const prop = defineProps(['order'])
  const { validate } = useForm()
  let modal
  onMounted(function () {
    modal = new Modal(DOM.value)
  })
  watch(
    () => prop.order,
    function (newValue) { OrderStore.order = newValue }
  )
  defineExpose({ show })
  function show () { modal.show() }
  function hide () { modal.hide() }
  function payOrder () {
        OrderStore.payOrder()
        OrderStore.getOrders()
        OrderStore.order = {}
        hide()
  }
</script>

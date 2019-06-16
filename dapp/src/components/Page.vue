<template>
  <div>
    <h1 class="text-md-center">Данные ВИЭ “Вертушка”</h1>

    <v-container grid-list-md class="px-3">
      <v-layout row wrap>
        <v-flex md12>
          <v-card>
            <v-card-text>
              <v-container grid-list-md class="px-3">
                <v-layout row wrap>
                  <v-flex md12>
                    <b>Маяк</b>:
                    <a
                      :href="`https://etherscan.io/address/${lighthouse.address}`"
                      target="blank"
                    >{{ lighthouse.name }}</a>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-divider/>
              <v-container grid-list-md class="px-3">
                <v-layout row wrap>
                  <v-flex md12>
                    <div>
                      <b>Адрес владельца ВИЭ в сети</b>: <a :href="`https://etherscan.io/address/${account}`" target="blank" >{{ account }}</a>
                    </div>
                    <div>
                      <b>Стоимость</b>: {{ price | fromWei(9, 'XRT') }} |
                      <b>Баланс</b>:
                      <a :href="`https://etherscan.io/token/${token}?a=${account}`" target="blank" >{{ balance | fromWei(9, 'XRT') }}</a>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md12>
          <v-card v-if="liability">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Показания с 10 по 30 июня 2019 года</h3>
              </div>
            </v-card-title>
            <v-card-text>
                <v-progress-linear v-if="!result" :indeterminate="true"></v-progress-linear>
                <div v-else>
                  <b>Суммарная генерация: 100 МВт</b>
                  <br>

                  <b>Лог от счётчика:</b>
                  <a :href="`https://ipfs.io/ipfs/${result.result}`" target="_blank">{{ result.result }}</a>
                  <br>

                  <b>Отправить показания на проверку</b>
                  <br>
                  <v-btn @click="confirm(liability.address)"  >Подтвердить</v-btn>
                  <v-btn   >Отклонить</v-btn>
                  <br>
                </div>
              </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex md6>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Данные проверки верификатора:</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <div class="t-break" v-if="result">
                <div v-if="result.status === 'finish'">
                  <b>Проверка по открытым источникам данных о скорости ветра:</b> успешно.
                  <br>
                  <b>Создан реестр зеленых сертификатов по адресу:</b> {{ liability.address }}
                  <br>
                  <b>Выполнена транзакция на выдачу 100 зеленых сертификатов на адрес владельца</b> promisee
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md6>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Данные сохраненные в публичный Ethereum blockchain:</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <div class="t-break" v-if="result">
                <div v-if="result.status === 'finish'">
                  <b>ВИЭ:</b> {{ promisor }}
                  <br>
                  <b>Информация о выдаче зеленых сертификатов в распределенном реестре доступна по адресу:</b> {{ result.liability }}
                  <br>
                  <b>Лог от ВИЭ:</b> ipfs hash
                  <br>
                  <b>Лог от верификатора:</b> ipfs hash
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</div>
</template>

<script>
import { Liability } from "robonomics-js";
// import Vue from "vue";
import * as config from "../config";

export default {
  data() {
    return {
      lighthouse: {
        name: "",
        address: ""
      },
      account: "",
      price: config.PRICE,
      token: "",
      balance: 0,
      approveTrade: 0,
      loadingApprove: false,
      liability: null,
      result: null,
      promisor: "",
      promisee: "",
      nonce: 0
    };
  },
  mounted() {
    this.lighthouse.name = this.$robonomics.lighthouse.name;
    this.lighthouse.address = this.$robonomics.lighthouse.address;
    this.account = this.$robonomics.account.address;
    this.token = this.$robonomics.xrt.address;
    this.$robonomics.factory.call
      .nonceOf(this.$robonomics.account.address)
      .then(r => {
        this.nonce = Number(r);
      });
    this.$robonomics.onResult(msg => {
      console.log("result unverified", msg);
      if (this.liability) {
        if (this.liability.address === msg.liability) {
          const liability = new Liability(
            this.$robonomics.web3,
            msg.liability,
            "0x0000000000000000000000000000000000000000"
          );
          liability.getInfo().then(info => {
            console.log("getInfo()", info);
            if (
              info.validator ===
              this.$robonomics.web3.toChecksumAddress(config.VALIDATOR)
            ) {
              this.result = {
                ...msg,
                status: "new"
              };
              console.log("added to result", this.result);
            }
          });
        }
      }
    });
    this.$robonomics.onDemand(msg => {
      console.log("demand", msg);
    });
    this.$robonomics.onLiability((err, liability) => {
      liability.getInfo().then(info => {
        if (info.model === config.MODEL) {
          this.promisor = info.promisor;
          this.promisee = info.promisee;
          this.liability =
            {
              address: liability.address,
              worker: liability.worker,
              ...info
            };
          console.log("liability", this.liability);
        }
      });

      liability.onResult().then(result => {
        console.log("liability.onResult()", result);
        this.setResult(liability.address, result, true);
      });
    });
    this.fetchBalance();
  },
  methods: {
    fetchBalance() {
      return this.$robonomics.xrt.call
        .balanceOf(this.$robonomics.account.address)
        .then(balanceOf => {
          this.balance = balanceOf;
          if (balanceOf > 0) {
            return this.$robonomics.xrt.call.allowance(
              this.$robonomics.account.address,
              this.$robonomics.factory.address
            );
          }
          return false;
        })
        .then(allowance => {
          if (allowance) {
            this.approveTrade = allowance;
          }
        });
    },
    setResult(address, result, check = true) {
      // const i = this.liability.findIndex(item => item.address === address);
      console.log("setResult", address);
      if (this.liability.address === address) {
        this.liability.result = result;
        this.liability.check = check;
        this.result.status = 'finish';
      }
    },
    confirm(address) {
      console.log('confirm', address);
      const item = this.result;
      console.log('confirm', item);
      this.$robonomics
        .sendResult({
          liability: address,
          success: true,
          result: item.result
        })
        .then(() => {
          item.status = "confirm";
          const liability = new Liability(
            this.$robonomics.web3,
            address,
            "0x0000000000000000000000000000000000000000"
          );
          liability.onResult().then(() => {
            item.status = "finish";
          });
        });
    }
  }
};
</script>

<style>
.block {
  border: 1px solid #eee;
  padding: 10px;
  margin: 10px 0;
}
</style>

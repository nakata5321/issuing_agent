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
          <v-card v-if="liability.length>0">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Показания с 01 по 30 мая 2019 года</h3>
              </div>
            </v-card-title>
            <v-card-text v-for="(item, i) in liability" :key="i">
                <b>Суммарная генерация: 100 МВт</b>
                <br>
                <b>Лог от счётчика:</b>
                <a :href="`https://ipfs.io/ipfs/${item.result}`" target="_blank">{{ item.result }}</a>
                <br>

                <b>Отправить показания на проверку</b>
                <br>
                <v-btn @click="confirm(item.address)" :disabled="resultSent ? true : false" >Подтвердить</v-btn>
                <v-btn  :disabled="resultSent ? true : false" >Отклонить</v-btn>
                <br>

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
              <div class="t-break" v-for="(item, i) in results" :key="i">
                <div v-if="item.status === 'finish'">
                  <b>Проверка по открытым источникам данных о скорости ветра:</b> успешно.
                  <br>
                  <b>Создан реестр зеленых сертификатов по адресу:</b> 0x
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
              <p class="t-break" v-for="(item, i) in results" :key="i">
                <b>ВИЭ:</b> {{ promisor }}
                <br>
                <b>Информация о выдаче зеленых сертификатов в распределенном реестре доступна по адресу:</b> {{ item.liability }}
                <br>
                <b>Лог от ВИЭ:</b> ipfs hash
                <br>
                <b>Лог от верификатора:</b> ipfs hash
              </p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</div>
</template>

<script>
import { Liability } from "robonomics-js";
import Vue from "vue";
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
      liability: [],
      results: [],
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
      console.log(msg);
      const item = this.results.find(item => item.liability === msg.liability);
      if (!item) {
        const liability = new Liability(
          this.$robonomics.web3,
          msg.liability,
          "0x0000000000000000000000000000000000000000"
        );
        liability.getInfo().then(info => {
          if (
            info.validator ===
            this.$robonomics.web3.toChecksumAddress(config.VALIDATOR)
          ) {
            if (item.status == "finish") {
              this.results = [{...msg, status: "finish"}, ...this.results];
            } else {
              this.results = [
                {
                  ...msg,
                  status: "new"
                },
                ...this.results
              ];
            }
          }
        });
      }
    });
    this.$robonomics.onLiability((err, liability) => {
      const item = this.liability.find(
        item => item.address === liability.address
      );
      if (!item) {
        liability.getInfo().then(info => {
          this.promisor = info.promisor;
          this.promisee = info.promisee;
          this.liability = [
            {
              address: liability.address,
              worker: liability.worker,
              ...info
            },
            ...this.liability
          ];
        });
        liability.onResult().then(result => {
          this.setResult(liability.address, result, true);
        });
      }
    });
    this.fetchBalance();

    // FOR TEST PURPOSE ONLY
    /* this.liability.push({
      "address": "0x911Ea2bE315f4dEDbc8C457eB9A1234971f59A81",
      "lighthouse": "0x202a09A451DE674d2d65Bf1C90968a8d8F72cf7b",
      "validator": "0x17B82177D8753bd8090dadA60B953CFaDD9eF492",
      "model": "QmUB6ajZTLLMZg7re1v4hw44aoG8HDQDHr9JyujU264Aw2",
      "objective": "Qmbm3o2wkqseSEi5F69CPAuDrsKnrwTJ3HN5FVLPgLHKUm",
      "token": "0x966ebbfd7ecbcf44b1e05341976e0652cfa01360",
      "cost": 0,
      "promisee": "0x4af74a76aA7B934C7397FDD0C2428762c8F7c550",
      "promisor": "0xEb51Cf2a474BfC756cD40A9e9092E6eEe15f2dc3",
      "result": "QmVZzCia7Ptm3CiDUcF9ZYkKQuMMjFCKYjS2ckZYzMJsm7"
    }); */
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
      const i = this.liability.findIndex(item => item.address === address);
      if (i >= 0) {
        Vue.set(this.liability, i, { ...this.liability[i], result, check });
      }
    },
    confirm(address) {
      const item = this.results.find(item => item.liability === address);
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

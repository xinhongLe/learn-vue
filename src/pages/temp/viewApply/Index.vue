<template>
  <div class="view-apply">
    <!--  顶部按钮  -->
    <div class="top-btns">
      <el-button @click="$router.go(-1)">返回</el-button>
      <el-button @click="handleReset">重置</el-button>
    </div>

    <!--  顶部表单  -->
    <el-row class="form-wrapper">
      <el-col :span="16">
        <el-form ref="inlineForm" class="inline-form" :inline="true" :model="inlineForm">
          <el-form-item label="申请码ID:" class="apply-id" prop="applyId">
            <el-input v-model="inlineForm.applyId" />
          </el-form-item>
          <el-form-item label="授权书编号:" class="authorization-no" prop="authorizationNo">
            <el-input v-model="inlineForm.authorizationNo" />
          </el-form-item>
          <el-form-item class="apply-code-btn">
            <el-button @click="applyCodeDialogVisible = true">查看申请码</el-button>
          </el-form-item>
          <el-form-item class="read-apply-code-btn">
            <el-button @click="readApplyCodeDialogVisible = true">读入申请码数据</el-button>
          </el-form-item>
        </el-form>
        <el-form ref="form" :model="form" label-width="300px" :rules="rules">
          <el-form-item label="贸易信息单号:" prop="tradeNO">
            <el-input v-model="form.tradeNO" :disabled="form.disabled" />
          </el-form-item>
          <el-form-item label="借方企业名称/姓名:" prop="debitEnterpriseName">
            <el-input v-model="form.debitEnterpriseName" :disabled="form.disabled" />
          </el-form-item>
          <el-form-item label="借方统一社会信用代码/身份证号:" prop="debitNsrsbh">
            <el-input v-model="form.debitNsrsbh" :disabled="form.disabled" />
          </el-form-item>
          <el-form-item label="借方地址、电话/手机号:" prop="debitMobile">
            <el-input v-model="form.debitMobile" :disabled="form.disabled" />
          </el-form-item>
          <el-form-item label="借方开户行及账号:" prop="debitBankNumber">
            <el-input v-model="form.debitBankNumber" :disabled="form.disabled" />
          </el-form-item>
          <el-form-item label="融出方名称:" prop="financeEnterpriseName">
            <el-input v-model="form.financeEnterpriseName" :disabled="form.disabled" />
          </el-form-item>
          <el-form-item label="融出方统一社会信用代码:" prop="financeNsrsbh">
            <el-input v-model="form.financeNsrsbh" :disabled="form.disabled" />
          </el-form-item>
          <el-form-item label="融出方地址、电话:" prop="financeMobile">
            <el-input v-model="form.financeMobile" :disabled="form.disabled" />
          </el-form-item>
          <el-form-item label="融出方开户行及账号:" prop="financeBankNumber">
            <el-input v-model="form.financeBankNumber" :disabled="form.disabled" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!--  贸易合同信息  -->
    <div class="table-wrapper">
      <h4 class="table-title">贸易合同信息</h4>
      <el-form ref="tradeContractTableForm" :model="tradeContractForm" label-width="0">
        <el-table :data="tradeContractForm.tradeContractInfos" border header-row-class-name="table-header">
          <el-table-column label="序号" width="55">
            <template v-slot="{$index}">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="tradeContractNo" label="贸易合同号" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'tradeContractInfos['+$index+'].tradeContractNo'"
                :rules="tradeContractRules.tradeContractNo"
              >
                <el-input
                  v-model="tradeContractForm.tradeContractInfos[$index].tradeContractNo"
                  :disabled="tradeContractForm.tradeContractFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="buyer" label="买方" width="180" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'tradeContractInfos['+$index+'].buyer'"
                :rules="tradeContractRules.buyer"
              >
                <el-input
                  v-model="row.buyer"
                  :disabled="tradeContractForm.tradeContractFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="seller" label="卖方" width="180" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'tradeContractInfos['+$index+'].seller'"
                :rules="tradeContractRules.seller"
              >
                <el-input
                  v-model="row.seller"
                  :disabled="tradeContractForm.tradeContractFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="contractPayTimes" label="合同内付款次数" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'tradeContractInfos['+$index+'].contractPayTimes'"
                :rules="tradeContractRules.contractPayTimes"
              >
                <el-input
                  v-model="row.contractPayTimes"
                  :disabled="tradeContractForm.tradeContractFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="contractMoney" label="合同金额" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'tradeContractInfos['+$index+'].contractMoney'"
                :rules="tradeContractRules.contractMoney"
              >
                <el-input
                  v-model="row.contractMoney"
                  class="money-txt"
                  :disabled="tradeContractForm.tradeContractFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="300">
            <template v-slot="{$index, row}">
              <el-button type="text" @click="handleOpenTradeContractUpload($index)">上传贸易合同
              </el-button>
              <el-button type="text" @click="handleViewTradeContractFile($index, row)">查看</el-button>
              <el-button type="text" @click="handleAddTradeContractRow($index)">添加</el-button>
              <el-button type="text" @click="handleDeleteTradeContractRow($index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <input
          ref="tradeContractFile"
          type="file"
          style="display: none;"
          @change="handleTradeContractUploadChange"
        >
      </el-form>
    </div>

    <!--  贸易背景信息  -->
    <div class="table-wrapper">
      <h4 class="table-title">贸易背景信息</h4>
      <el-form ref="tradeBgTableForm" :model="tradeBgForm" label-width="0">
        <el-table :data="tradeBgForm.tradeBgInfos" style="width: 100%" border header-row-class-name="table-header">
          <el-table-column type="selection" width="55" />
          <el-table-column label="序号" width="55">
            <template v-slot="{$index}">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="tradeContractNo" label="贸易合同号" show-overflow-tooltip width="150">
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'tradeBgInfos['+$index+'].tradeContractNo'"
                :rules="tradeBgRules.tradeContractNo"
              >
                <el-input
                  v-model="row.tradeContractNo"
                  :disabled="tradeBgForm.tradeBgFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="payNode" label="付款节点" show-overflow-tooltip width="120">
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'tradeBgInfos['+$index+'].payNode'"
                :rules="tradeBgRules.payNode"
              >
                <el-input
                  v-model="row.payNode"
                  :disabled="tradeBgForm.tradeBgFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="payNodeMoney" label="付款节点金额" show-overflow-tooltip width="120">
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'tradeBgInfos['+$index+'].payNodeMoney'"
                :rules="tradeBgRules.payNodeMoney"
              >
                <el-input
                  v-model="row.payNodeMoney"
                  class="money-txt"
                  :disabled="tradeBgForm.tradeBgFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="proportion" label="占合同金额比例" width="120">
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'tradeBgInfos['+$index+'].proportion'"
                :rules="tradeBgRules.proportion"
              >
                <el-input
                  v-model="row.proportion"
                  :disabled="tradeBgForm.tradeBgFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="确权凭证编号" show-overflow-tooltip width="120">
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'tradeBgInfos['+$index+'].number'"
                :rules="tradeBgRules.number"
              >
                <el-input
                  v-model="row.number"
                  class="money-txt"
                  :disabled="tradeBgForm.tradeBgFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="transfer" label="确权凭证是否可转让" width="130" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeBgInfos['+$index+'].transfer'">
                <el-select v-model="row.transfer" :disabled="tradeBgForm.tradeBgFormDisabled">
                  <el-option
                    v-for="(item, index) in options.transferOptions"
                    :key="index"
                    :label="item.value"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="finishPay" label="是否完成付款" width="100" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeBgInfos['+$index+'].finishPay'">
                <el-select v-model="row.finishPay" :disabled="tradeBgForm.tradeBgFormDisabled">
                  <el-option
                    v-for="(item, index) in options.payOptions"
                    :key="index"
                    :label="item.value"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="invoiceNum" label="发票数量" width="80" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeBgInfos['+$index+'].invoiceNum'">
                <el-input
                  v-model="row.invoiceNum"
                  :disabled="tradeBgForm.tradeBgFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="invoiceMoney" label="发票金额含税价" width="110" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeBgInfos['+$index+'].invoiceMoney'">
                <el-input
                  v-model="row.invoiceMoney"
                  class="money-txt"
                  :disabled="tradeBgForm.tradeBgFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="applyId" label="申请码ID" width="120" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'tradeBgInfos['+$index+'].applyId'">
                <el-input
                  v-model="row.applyId"
                  class="money-txt"
                  :disabled="tradeBgForm.tradeBgFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="400">
            <template v-slot="{$index,row}">
              <el-button type="text" @click="handleViewTradeBgUploadInvoice($index, row)">上传发票</el-button>
              <el-button type="text" @click="handleTradeBgTokenFileUpload($index, row)">上传确权凭证</el-button>
              <el-button type="text">接口读入确权凭证</el-button>
              <el-button type="text" @click="handleViewTradeBgInvoice($index, row)">查看发票信息</el-button>
              <el-button type="text" @click="handleViewTokenFile($index, row)">查看确权凭证</el-button>
              <el-button type="text" @click="handleDeleteTradeBgRow($index, row)">删除</el-button>
              <el-button type="text" @click="handleAddTradeBgRow($index, row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <input
          ref="tradeBgTokenFile"
          type="file"
          style="display: none;"
          @change="handleTradeBgTokenFileChange"
        >
      </el-form>
    </div>

    <!--  融资提供方信息  -->
    <div class="table-wrapper">
      <h4 class="table-title">融资提供方信息</h4>
      <el-form ref="financeProviderTableForm" :model="financeProviderForm" label-width="0">
        <el-table
          :data="financeProviderForm.financeProviderInfos"
          style="width: 100%"
          border
          header-row-class-name="table-header"
        >
          <el-table-column label="序号" width="55">
            <template v-slot="{$index}">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="enterpriseName" label="单位名称" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'financeProviderInfos['+$index+'].enterpriseName'"
                :rules="financeProviderRules.enterpriseName"
              >
                <el-input
                  v-model="row.enterpriseName"
                  :disabled="financeProviderForm.financeProviderFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="nsrsbh" label="统一社会信用代码" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'financeProviderInfos['+$index+'].nsrsbh'"
                :rules="financeProviderRules.nsrsbh"
              >
                <el-input
                  v-model="row.nsrsbh"
                  :disabled="financeProviderForm.financeProviderFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="地址、电话" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'financeProviderInfos['+$index+'].mobile'"
                :rules="financeProviderRules.mobile"
              >
                <el-input
                  v-model="row.mobile"
                  :disabled="financeProviderForm.financeProviderFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="bank" label="开户行及账号" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'financeProviderInfos['+$index+'].bank'"
                :rules="financeProviderRules.bank"
              >
                <el-input
                  v-model="row.bank"
                  :disabled="financeProviderForm.financeProviderFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="authorizationNo" label="授权书编号" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'financeProviderInfos['+$index+'].authorizationNo'"
                :rules="financeProviderRules.authorizationNo"
              >
                <el-input
                  v-model="row.authorizationNo"
                  :disabled="financeProviderForm.financeProviderFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="300">
            <template v-slot="{$index, row}">
              <el-button type="text">生成授权书</el-button>
              <el-button type="text" @click="handleOpenFinanceProviderAuthorizationFileUpload($index, row)">上传授权书</el-button>
              <el-button type="text" @click="handleViewFinanceProviderAuthorizationFile($index, row)">查看</el-button>
              <el-button type="text" @click="handleAddFinanceProviderRow($index, row)">添加</el-button>
              <el-button type="text" @click="handleDeleteFinanceProviderRow($index, row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <input
          ref="financeProviderAuthorizationFile"
          type="file"
          style="display: none;"
          @change="handleFinanceProviderAuthorizationFileChange"
        >
      </el-form>
    </div>

    <!--  上传区域 -->
    <el-row class="upload-wrapper" :gutter="25">
      <el-col :span="12">
        <el-button @click="$refs.authorizationFile.click()">上传授权书</el-button>
        <span class="note">请上传盖章后的授权书</span>
        <el-form ref="authorizationFileTableForm" :model="fileForm" label-width="0">
          <el-table v-if="fileForm.authorizationFiles.length > 0" :data="fileForm.authorizationFiles" style="width: 100%">
            <el-table-column prop="file" label="文件名" width="180">
              <template v-slot="{row}">
                {{ row.file.name }}
              </template>
            </el-table-column>
            <el-table-column prop="authorizationNo" label="授权书编号" width="180">
              <template v-slot="{$index, row}">
                <el-form-item
                  :prop="'authorizationFiles['+$index+'].authorizationNo'"
                  :rules="authorizationFileRules.authorizationNo"
                >
                  <el-input
                    v-model="row.authorizationNo"
                    :disabled="fileForm.authorizationFileDisabled"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="{$index}">
                <el-button type="text" @click="handleDownloadAuthorizationFile($index)">下载</el-button>
                <el-button type="text" @click="handleDeleteAuthorizationFile($index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <input ref="authorizationFile" type="file" style="display: none;" @change="handleAuthorizationUploadChange">
        </el-form>
      </el-col>
      <el-col :span="12" class="appendix-wrapper">
        <el-button @click="$refs.appendixFile.click()">上传附件</el-button>
        <span class="note">如需提交其它资料，请上传</span>
        <input ref="appendixFile" type="file" style="display: none;" @change="handleAppendixUploadChange">
        <el-table v-if="fileForm.appendixFiles.length > 0" :data="fileForm.appendixFiles" style="width: 100%">
          <el-table-column prop="file" label="文件名" width="180">
            <template v-slot="{row}">
              {{ row.file.name }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{$index}">
              <el-button type="text" @click="handleDownloadAppendixFile($index)">下载</el-button>
              <el-button type="text" @click="handleDeleteAppendixFile($index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--  底部按钮 -->
    <el-row class="bottom-wrapper" type="flex" justify="center">
      <el-col :span="3">
        <el-button @click="handleSave">保存</el-button>
      </el-col>
      <el-col :span="3">
        <el-button>生成申请码</el-button>
      </el-col>
      <el-col :span="3">
        <el-button @click="handleSubmit">提交</el-button>
      </el-col>
    </el-row>

    <!--  查看申请码  -->
    <el-dialog
      custom-class="apply-code-dialog"
      :center="true"
      :show-close="false"
      title="查看申请码"
      :visible.sync="applyCodeDialogVisible"
      width="30%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="applyCodeDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--  读入申请码数据  -->
    <el-dialog
      custom-class="read-apply-code-dialog"
      :center="true"
      :show-close="false"
      title="提示"
      :visible.sync="readApplyCodeDialogVisible"
      width="30%"
    >
      <span>该录入需要读取的申请码ID和授权书编号!</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="readApplyCodeDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--  贸易合同附件  -->
    <el-dialog
      :center="true"
      :show-close="false"
      title="查看附件"
      :visible.sync="tradeContractFileDialogVisible"
      width="30%"
    >
      <el-table
        v-if="openTradeContractDialogRow.$index >= 0 && tradeContractForm.tradeContractInfos[openTradeContractDialogRow.$index]"
        :data="tradeContractForm.tradeContractInfos[openTradeContractDialogRow.$index].tradeContractFiles"
        style="width:100%"
      >
        <el-table-column prop="file" label="文件名" width="180">
          <template v-slot="{row}">
            {{ row.file.name }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{$index, row}">
            <el-button type="text" @click="handleDownloadTradeContractFile($index, row)">下载</el-button>
            <el-button type="text" class="delete-btn" @click="handleDeleteTradeContractFile($index, row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="tradeContractFileDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--  贸易背景上传发票  -->
    <el-dialog
      class="trade-bg-upload-invoice"
      :center="true"
      :show-close="false"
      title="上传发票"
      :visible.sync="tradeBgUploadInvoiceDialogVisible"
      width="65%"
    >
      <div class="btns">
        <el-button @click="$refs.invoiceFile.click()">导入文件</el-button>
        <input ref="invoiceFile" type="file" style="display: none;" @change="handleTradeBgUploadInvoiceChange">
        <el-button @click="handleDownloadTradeBgTemplateFile">模板下载</el-button>
        <el-button @click="handleCheckTradeBgInvoice">发票查验</el-button>
      </div>
      <el-form
        v-if="openTradeBgDialogRow.$index >=0 && tradeBgForm.tradeBgInfos[openTradeBgDialogRow.$index].invoiceInfoForm"
        ref="tradeBgUploadInvoiceTableForm"
        :model="tradeBgForm.tradeBgInfos[openTradeBgDialogRow.$index].invoiceInfoForm"
        label-width="0"
      >
        <el-table
          :data="tradeBgForm.tradeBgInfos[openTradeBgDialogRow.$index].invoiceInfoForm.infos"
          style="width: 100%"
          border
          header-row-class-name="table-header"
        >
          <el-table-column label="序号" width="55">
            <template v-slot="{$index}">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="invoiceCode" label="发票代码" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'infos['+$index+'].invoiceCode'"
                :rules="tradeBgInvoiceRules.invoiceCode"
              >
                <el-input
                  v-model="row.invoiceCode"
                  :disabled="tradeBgForm.tradeBgUploadInvoiceFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="invoiceNumber" label="发票号码" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'infos['+$index+'].invoiceNumber'"
                :rules="tradeBgInvoiceRules.invoiceNumber"
              >
                <el-input
                  v-model="row.invoiceNumber"
                  :disabled="tradeBgForm.tradeBgUploadInvoiceFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="kprq" label="开票日期" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'infos['+$index+'].kprq'"
                :rules="tradeBgInvoiceRules.kprq"
              >
                <el-input
                  v-model="row.kprq"
                  :disabled="tradeBgForm.tradeBgUploadInvoiceFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="invoiceMoney" label="发票金额" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item
                :prop="'infos['+$index+'].invoiceMoney'"
                :rules="tradeBgInvoiceRules.invoiceMoney"
              >
                <el-input
                  v-model="row.invoiceMoney"
                  class="money-txt"
                  :disabled="tradeBgForm.tradeBgUploadInvoiceFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="checkCode" label="校验码" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              <el-form-item :prop="'infos['+$index+'].checkCode'">
                <el-input
                  v-model="row.checkCode"
                  :disabled="tradeBgForm.tradeBgUploadInvoiceFormDisabled"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="checked" label="查验结果" show-overflow-tooltip>
            <template v-slot="{row, $index}">
              {{ row.checked.length === 0 ? '' : row.checked === '0' ? '查验不通过': '查验通过' }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{$index, row}">
              <el-button type="text" @click="handleAddTradeBgUploadInvoiceRow($index, row)">添加</el-button>
              <el-button type="text" class="delete-btn" @click="handleDeleteTradeBgUploadInvoiceRow($index, row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleTradeBgUploadInvoiceClose">取 消</el-button>
        <el-button type="primary" @click="handleTradeBgUploadInvoiceConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <!--  贸易背景查看发票  -->
    <el-dialog
      class="trade-bg-view-invoice"
      :center="true"
      :show-close="false"
      title="查看发票"
      :visible.sync="tradeBgViewInvoiceDialogVisible"
      width="65%"
    >
      <el-table
        v-if="openTradeBgDialogRow.$index >=0 && tradeBgForm.tradeBgInfos[openTradeBgDialogRow.$index].invoiceInfoForm"
        :data="tradeBgForm.tradeBgInfos[openTradeBgDialogRow.$index].invoiceInfoForm.infos"
        style="width: 100%"
        border
        header-row-class-name="table-header"
      >
        <el-table-column label="序号" width="55">
          <template v-slot="{$index}">
            {{ $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="invoiceCode" label="发票代码" show-overflow-tooltip />
        <el-table-column prop="invoiceNumber" label="发票号码" show-overflow-tooltip />
        <el-table-column prop="kprq" label="开票日期" show-overflow-tooltip />
        <el-table-column prop="invoiceMoney" label="发票金额" show-overflow-tooltip align="right" />
        <el-table-column prop="checkCode" label="校验码" show-overflow-tooltip />
        <el-table-column prop="checked" label="查验结果" show-overflow-tooltip>
          <template v-slot="{row, $index}">
            {{ row.checked.length === 0 ? '' : row.checked === '0' ? '查验不通过': '查验通过' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{$index, row}">
            <el-button type="text" @click="handleClickInvoice($index, row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="tradeBgViewInvoiceDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--  贸易背景 确权凭证  -->
    <el-dialog
      :center="true"
      :show-close="false"
      title="查看附件"
      :visible.sync="tradeBgViewTokenFileDialogVisible"
      width="30%"
    >
      <el-table
        v-if="openTradeBgDialogRow.$index >= 0 && tradeBgForm.tradeBgInfos[openTradeBgDialogRow.$index]"
        :data="tradeBgForm.tradeBgInfos[openTradeBgDialogRow.$index].tokenFiles"
        style="width:100%"
      >
        <el-table-column prop="file" label="文件名" width="180">
          <template v-slot="{row}">
            {{ row.file.name }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{$index, row}">
            <el-button type="text" @click="handleDownloadTradeContractFile($index, row)">下载</el-button>
            <el-button type="text" class="delete-btn" @click="handleDeleteTradeContractFile($index, row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="tradeBgViewTokenFileDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--  融资提供方 查看授权书  -->
    <el-dialog
      :center="true"
      :show-close="false"
      title="查看附件"
      :visible.sync="financeProviderAuthorizationFileDialogVisible"
      width="30%"
    >
      <el-table
        v-if="openFinanceProviderDialogRow.$index >= 0 && financeProviderForm.financeProviderInfos[openFinanceProviderDialogRow.$index]"
        :data="financeProviderForm.financeProviderInfos[openFinanceProviderDialogRow.$index].authorizationFiles"
        style="width:100%"
      >
        <el-table-column prop="file" label="文件名" width="180">
          <template v-slot="{row}">
            {{ row.file.name }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{$index, row}">
            <el-button type="text" @click="handleDownloadFinanceProviderAuthorizationFile($index, row)">下载</el-button>
            <el-button
              type="text"
              class="delete-btn"
              @click="handleDeleteFinanceProviderAuthorizationFile($index,
                                                                   row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="financeProviderAuthorizationFileDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  name: 'ViewApply',
  data() {
    return {
      rules: {
        debitEnterpriseName: [
          { required: true, message: '请输入借方企业名称/姓名', trigger: 'blur' }
        ],
        debitNsrsbh: [
          { required: true, message: '请输入借方统一社会信用代码/身份证号', trigger: 'blur' }
        ],
        debitMobile: [
          { required: true, message: '请输入借方地址、电话/手机号', trigger: 'blur' }
        ],
        debitBankNumber: [
          { required: true, message: '请输入借方开户行及账号', trigger: 'blur' }
        ]
      },
      tradeContractRules: {
        tradeContractNo: [
          { required: true, message: '请输入贸易合同号', trigger: 'blur' }
        ],
        buyer: [
          { required: true, message: '请输入买方', trigger: 'blur' }
        ],
        seller: [
          { required: true, message: '请输入卖方', trigger: 'blur' }
        ],
        contractPayTimes: [
          { required: true, message: '请输入付款次数', trigger: 'blur' }
        ],
        contractMoney: [
          { required: true, message: '请输入合同金额', trigger: 'blur' }
        ]
      },
      tradeBgRules: {
        tradeContractNo: [
          { required: true, message: '请输入贸易合同号', trigger: 'blur' }
        ],
        payNode: [
          { required: true, message: '请输入付款节点', trigger: 'blur' }
        ],
        payNodeMoney: [
          { required: true, message: '请输入节点金额', trigger: 'blur' }
        ],
        proportion: [
          { required: true, message: '请输入付款占比', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入确权凭证编号', trigger: 'blur' }
        ]
      },
      tradeBgInvoiceRules: {
        invoiceCode: [
          { required: true, message: '请输入发票代码', trigger: 'blur' }
        ],
        invoiceNumber: [
          { required: true, message: '请输入发票号码', trigger: 'blur' }
        ],
        kprq: [
          { required: true, message: '请输入开票日期', trigger: 'blur' }
        ],
        invoiceMoney: [
          { required: true, message: '请输入发票金额', trigger: 'blur' }
        ]
      },
      financeProviderRules: {
        enterpriseName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        nsrsbh: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入地址、电话', trigger: 'blur' }
        ],
        bank: [
          { required: true, message: '请输入开户行及账号', trigger: 'blur' }
        ],
        authorizationNo: [
          { required: true, message: '请输入授权书编号', trigger: 'blur' }
        ]
      },
      authorizationFileRules: {
        authorizationNo: [
          { required: true, message: '请输入授权书编号', trigger: 'blur' }
        ]
      },
      options: {
        transferOptions: [
          { code: '0', value: '未确定' },
          { code: '1', value: '可转让' }
        ],
        payOptions: [
          { code: '0', value: '否' },
          { code: '1', value: '是' }
        ]
      },
      inlineForm: {
        applyId: '',
        authorizationNo: ''
      },
      form: {
        disabled: true,
        tradeNO: '2020010601',
        // debitEnterpriseName: '企业A',
        // debitNsrsbh: '911400000000000001',
        // debitMobile: '地址、电话/手机号',
        // debitBankNumber: '开户行及账号',
        // financeEnterpriseName: '111111111111111111',
        // financeNsrsbh: '111111111111111111',
        // financeMobile: '111111111111111111',
        // financeBankNumber: '111111111111111111',
        // tradeNO: '',
        debitEnterpriseName: '',
        debitNsrsbh: '',
        debitMobile: '',
        debitBankNumber: '',
        financeEnterpriseName: '',
        financeNsrsbh: '',
        financeMobile: '',
        financeBankNumber: ''
      },
      openTradeContractDialogRow: {
        $index: -1
      },
      tradeContractForm: {
        tradeContractFormDisabled: false,
        tradeContractInfos: [
          {
            tradeContractNo: '2020-01-10-15-10-11',
            buyer: '买方1',
            seller: '卖方1',
            contractPayTimes: '2',
            contractMoney: '111.00',
            tradeContractFiles: [
              {
                id: 0,
                file: { name: 'xxx1' },
                url: '/static/file/贸易合同书.doc'
              }
            ]
          },
          {
            tradeContractNo: '2020-01-15-19-19-19',
            buyer: '买方2',
            seller: '卖方2',
            contractPayTimes: '5',
            contractMoney: '8888888.00',
            tradeContractFiles: []
          }
        ],
        tradeContractEmptyInfo: {
          tradeContractNo: '',
          buyer: '',
          seller: '',
          contractPayTimes: '',
          contractMoney: '',
          tradeContractFiles: []
        }
      },
      openTradeBgDialogRow: {
        $index: -1
      },
      tradeBgForm: {
        tradeBgFormDisabled: false,
        tradeBgUploadInvoiceFormDisabled: false,
        invoiceEmptyInfo: {
          invoiceCode: '',
          invoiceNumber: '',
          kprq: '',
          invoiceMoney: '',
          checkCode: '',
          checked: ''
        },
        tradeBgEmptyInfo: {
          tradeContractNo: '',
          payNode: '',
          payNodeMoney: '',
          proportion: '',
          number: '',
          transfer: '0',
          finishPay: '1',
          invoiceNum: 0,
          invoiceMoney: '',
          applyId: '',
          invoiceInfoForm: {
            infos: []
          },
          tokenFiles: []
        },
        // 用来保存临时的上传发票
        invoiceInfoTempForm: {},
        tradeBgInfos: [
          {
            tradeContractNo: '2020-01-10-15-10-11',
            payNode: '节点1',
            payNodeMoney: '11111.00',
            proportion: '100%',
            number: '1230123-123',
            transfer: '0',
            finishPay: '1',
            invoiceNum: 3,
            invoiceMoney: '1111.00',
            applyId: 'afdsf-baa1234',
            invoiceInfoForm: {
              infos: [
                {
                  invoiceCode: '1231231',
                  invoiceNumber: '1231231',
                  kprq: '2020-01-10',
                  invoiceMoney: '1111.00',
                  checkCode: '1111.00',
                  checked: '0'
                }
              ]
            },
            tokenFiles: [
              {
                file: { name: 'xxx1' }
              }
            ]
          },
          {
            tradeContractNo: '2020-01-10-15-10-11',
            payNode: '节点2',
            payNodeMoney: '11111.00',
            proportion: '30%',
            number: '999993-123',
            transfer: '1',
            finishPay: '0',
            invoiceNum: 2,
            invoiceMoney: '8811.00',
            applyId: 'uwisk892-baa1234',
            invoiceInfoForm: {
              infos: []
            },
            tokenFiles: [
              {
                file: { name: 'xxx1' }
              }
            ]
          }
        ]
      },
      openFinanceProviderDialogRow: {
        $index: -1
      },
      financeProviderForm: {
        financeProviderFormDisabled: false,
        financeProviderEmptyInfo: {
          enterpriseName: '',
          nsrsbh: '',
          mobile: '',
          bank: '',
          authorizationNo: '',
          authorizationFiles: []
        },
        financeProviderInfos: [
          {
            enterpriseName: 'xxxxx1',
            nsrsbh: '23424243242442',
            mobile: '2342342',
            bank: '招商银行',
            authorizationNo: '1230123-123',
            authorizationFiles: []
          },
          {
            enterpriseName: 'xxxxx2',
            nsrsbh: '456456456',
            mobile: '23432432234',
            bank: '建设银行',
            authorizationNo: '56430123-123',
            authorizationFiles: []
          }
        ]
      },
      fileForm: {
        // 授权书
        authorizationFileDisabled: false,
        authorizationFiles: [
          {
            file: { name: 'xxx1' },
            authorizationNo: 'xxxxx1231',
            url: '/static/files/授权书.doc'
          }
        ],
        // 附件
        appendixFileDisabled: false,
        appendixFiles: [
          {
            file: { name: 'xxx1' },
            url: '/static/files/附件.doc'
          }
        ]
      },
      // 申请码 dialog
      applyCodeDialogVisible: false,
      // 读入申请码数据 dialog
      readApplyCodeDialogVisible: false,
      // 贸易合同附件 dialog
      tradeContractFileDialogVisible: false,
      // 贸易背景上传发票 dialog
      tradeBgUploadInvoiceDialogVisible: false,
      // 贸易背景查看发票 dialog
      tradeBgViewInvoiceDialogVisible: false,
      // 贸易背景确权凭证 dialog
      tradeBgViewTokenFileDialogVisible: false,
      // 融资提供方查看授权书 dialog
      financeProviderAuthorizationFileDialogVisible: false
    }
  },
  methods: {
    // 重置所有
    handleReset() {
      this.$refs.inlineForm && this.$refs.inlineForm.resetFields()
      this.$refs.form && this.$refs.form.resetFields()
      this.fileForm.appendixFiles = this.fileForm.authorizationFiles = []
      this.tradeContractForm.tradeContractInfos = [cloneDeep(this.tradeContractForm.tradeContractEmptyInfo)]
      this.tradeBgForm.tradeBgInfos = [cloneDeep(this.tradeBgForm.tradeBgEmptyInfo)]
      this.financeProviderForm.financeProviderInfos = [cloneDeep(this.financeProviderForm.financeProviderEmptyInfo)]
    },
    // 添加贸易合同行
    handleAddTradeContractRow($index) {
      const emptyInfo = cloneDeep(this.tradeContractForm.tradeContractEmptyInfo)
      this.tradeContractForm.tradeContractInfos.splice($index + 1, 0, emptyInfo)
    },
    // 删除贸易合同行
    handleDeleteTradeContractRow($index) {
      const infos = this.tradeContractForm.tradeContractInfos
      if (infos.length === 1) {
        const emptyInfo = cloneDeep(this.tradeContractForm.tradeContractEmptyInfo)
        infos.splice($index, 1, emptyInfo)
      } else {
        infos.splice($index, 1)
      }
    },
    // 打开上传文件框
    handleOpenTradeContractUpload($index) {
      this.openTradeContractDialogRow.$index = $index
      this.$refs.tradeContractFile.click()
    },
    // 上传贸易合同附件
    handleTradeContractUploadChange(e) {
      const { $index } = this.openTradeContractDialogRow
      const tradeContractFiles = this.tradeContractForm.tradeContractInfos[$index].tradeContractFiles
      Array.from(e.target.files).forEach(file => {
        tradeContractFiles.push({
          file: file,
          url: '/static/file/贸易合同书.doc'
        })
      })
    },
    // 查看贸易合同附件
    handleViewTradeContractFile($index, row) {
      this.tradeContractFileDialogVisible = true
      this.openTradeContractDialogRow = { $index, ...row }
    },
    // 删除贸易合同附件
    handleDeleteTradeContractFile($index, { id }) {
      const rowIndex = this.openTradeContractDialogRow.$index
      this.tradeContractForm.tradeContractInfos[rowIndex].tradeContractFiles.splice($index, 1)
    },
    // 下载贸易合同附件
    handleDownloadTradeContractFile($index, { id }) {
      const rowIndex = this.openTradeContractDialogRow.$index
      location.href = this.tradeContractForm.tradeContractInfos[rowIndex].tradeContractFiles[$index].url
    },
    // 打开贸易背景上传发票Dialog
    handleViewTradeBgUploadInvoice($index, row) {
      this.openTradeBgDialogRow = { $index, ...row }
      this.tradeBgForm.invoiceInfoTempForm = cloneDeep(this.tradeBgForm.tradeBgInfos[$index].invoiceInfoForm)
      this.tradeBgUploadInvoiceDialogVisible = true
    },
    // 贸易背景上传发票
    handleTradeBgUploadInvoiceChange(e) {
      const { $index } = this.openTradeBgDialogRow
      this.tradeBgForm.tradeBgInfos[$index].invoiceInfoForm.infos.push({
        invoiceCode: '1231231',
        invoiceNumber: '1231231',
        kprq: '2020-01-10',
        invoiceMoney: '1111.00',
        checkCode: '1111.00',
        checked: '0'
      })
    },
    // 贸易背景模板文件下载
    handleDownloadTradeBgTemplateFile() {
      location.href = '/static/files/发票导入模板文件.doc'
    },
    // 贸易背景发票查验
    handleCheckTradeBgInvoice() {
      const rowIndex = this.openTradeBgDialogRow.$index
      this.tradeBgForm.tradeBgInfos[rowIndex].invoiceInfoForm.infos.forEach(item => {
        item.checked = '1'
      })
    },
    // 贸易背景添加发票行
    handleAddTradeBgUploadInvoiceRow($index) {
      const emptyInfo = cloneDeep(this.tradeBgForm.invoiceEmptyInfo)
      const rowIndex = this.openTradeBgDialogRow.$index
      this.tradeBgForm.tradeBgInfos[rowIndex].invoiceInfoForm.infos.splice($index + 1, 0, emptyInfo)
    },
    // 贸易背景删除发票行
    handleDeleteTradeBgUploadInvoiceRow($index) {
      const rowIndex = this.openTradeBgDialogRow.$index
      const infos = this.tradeBgForm.tradeBgInfos[rowIndex].invoiceInfoForm.infos
      if (infos.length === 1) {
        const emptyInfo = cloneDeep(this.tradeBgForm.invoiceEmptyInfo)
        infos.splice($index, 1, emptyInfo)
      } else {
        infos.splice($index, 1)
      }
    },
    // 贸易背景上传发票 取消按钮
    handleTradeBgUploadInvoiceClose() {
      this.tradeBgUploadInvoiceDialogVisible = false
      const rowIndex = this.openTradeBgDialogRow.$index
      this.tradeBgForm.tradeBgInfos[rowIndex].invoiceInfoForm = this.tradeBgForm.invoiceInfoTempForm
    },
    // 贸易背景上传发票 确定按钮
    handleTradeBgUploadInvoiceConfirm() {
      this.$refs.tradeBgUploadInvoiceTableForm.validate(valid => {
        if (valid) {
          this.$message({ message: '保存成功', type: 'success' })
          this.tradeBgUploadInvoiceDialogVisible = false
        }
      })
    },
    // 贸易背景查看发票
    handleViewTradeBgInvoice($index, row) {
      this.tradeBgViewInvoiceDialogVisible = true
      this.openTradeBgDialogRow = { $index, ...row }
    },
    // todo 跳转查看发票
    handleClickInvoice($index) {
    },
    // 打开上传确权凭证框
    handleTradeBgTokenFileUpload($index) {
      this.openTradeBgDialogRow.$index = $index
      this.$refs.tradeBgTokenFile.click()
    },
    // 上传确权凭证
    handleTradeBgTokenFileChange(e) {
      const rowIndex = this.openTradeBgDialogRow.$index
      const tokenFiles = this.tradeBgForm.tradeBgInfos[rowIndex].tokenFiles
      Array.from(e.target.files).forEach(file => {
        tokenFiles.push(
          { file }
        )
      })
    },
    // 贸易背景 查看确权凭证
    handleViewTokenFile($index, row) {
      this.tradeBgViewTokenFileDialogVisible = true
      this.openTradeBgDialogRow = { $index, ...row }
    },
    // 贸易背景 添加行
    handleAddTradeBgRow($index, row) {
      const emptyInfo = cloneDeep(this.tradeBgForm.tradeBgEmptyInfo)
      this.tradeBgForm.tradeBgInfos.splice($index + 1, 0, emptyInfo)
    },
    // 贸易背景 删除行
    handleDeleteTradeBgRow($index, row) {
      const infos = this.tradeBgForm.tradeBgInfos
      if (infos.length === 1) {
        const emptyInfo = cloneDeep(this.tradeBgForm.tradeBgEmptyInfo)
        infos.splice($index, 1, emptyInfo)
      } else {
        infos.splice($index, 1)
      }
    },
    // 打开融资提供方授权书文件上传框
    handleOpenFinanceProviderAuthorizationFileUpload($index, row) {
      this.openFinanceProviderDialogRow = { $index, ...row }
      this.$refs.financeProviderAuthorizationFile.click()
    },
    // 融资提供方 上传授权书
    handleFinanceProviderAuthorizationFileChange(e) {
      const rowIndex = this.openFinanceProviderDialogRow.$index
      const authorizationFiles = this.financeProviderForm.financeProviderInfos[rowIndex].authorizationFiles
      Array.from(e.target.files).forEach(file => {
        authorizationFiles.push({
          file,
          url: '/static/files/授权书.doc'
        })
      })
    },
    // 融资提供方 查看授权书
    handleViewFinanceProviderAuthorizationFile($index, row) {
      this.openFinanceProviderDialogRow = { $index, ...row }
      this.financeProviderAuthorizationFileDialogVisible = true
    },
    // 融资提供方 查看授权书 下载
    handleDownloadFinanceProviderAuthorizationFile($index) {
      const rowIndex = this.openFinanceProviderDialogRow.$index
      location.href = this.financeProviderForm.financeProviderInfos[rowIndex].authorizationFiles[$index].url
    },
    // 融资提供方 查看授权书 删除
    handleDeleteFinanceProviderAuthorizationFile($index) {
      const rowIndex = this.openFinanceProviderDialogRow.$index
      this.financeProviderForm.financeProviderInfos[rowIndex].authorizationFiles.splice($index, 1)
    },
    // 融资提供方 添加行
    handleAddFinanceProviderRow($index) {
      const emptyInfo = cloneDeep(this.financeProviderForm.financeProviderEmptyInfo)
      this.financeProviderForm.financeProviderInfos.splice($index + 1, 0, emptyInfo)
    },
    // 融资提供方 删除行
    handleDeleteFinanceProviderRow($index) {
      const infos = this.financeProviderForm.financeProviderInfos
      if (infos.length === 1) {
        const emptyInfo = cloneDeep(this.financeProviderForm.financeProviderEmptyInfo)
        infos.splice($index, 1, emptyInfo)
      } else {
        infos.splice($index, 1)
      }
    },
    // 上传授权书
    handleAuthorizationUploadChange(e) {
      const authorizationFiles = this.fileForm.authorizationFiles
      Array.from(e.target.files).forEach(file => {
        authorizationFiles.push({
          file,
          authorizationNo: '',
          url: '/static/files/授权书.doc'
        })
      })
    },
    // 下载附件
    handleDownloadAuthorizationFile($index) {
      location.href = this.fileForm.authorizationFiles[$index].url
    },
    // 删除授权书
    handleDeleteAuthorizationFile($index) {
      this.fileForm.authorizationFiles.splice($index, 1)
    },
    // 上传附件
    handleAppendixUploadChange(e) {
      const appendixFiles = this.fileForm.appendixFiles
      Array.from(e.target.files).forEach(file => {
        appendixFiles.push({
          file,
          url: '/static/files/附件.doc'
        })
      })
    },
    // 下载附件
    handleDownloadAppendixFile($index) {
      location.href = this.fileForm.appendixFiles[$index].url
    },
    // 删除附件
    handleDeleteAppendixFile($index) {
      this.fileForm.appendixFiles.splice($index, 1)
    },
    // 保存
    handleSave() {
      this.__validate().then(() => {
        this.$message({ message: '保存成功', type: 'success' })
      })
    },
    // 提交
    handleSubmit() {
      this.__validate().then(() => {
        this.$message({ message: '提交成功', type: 'success' })
      })
    },
    // 校验
    __validate() {
      return new Promise((resolve, reject) => {
        const validates = []
        if (this.$refs.inlineForm) validates.push(this.$refs.inlineForm.validate())
        if (this.$refs.form) validates.push(this.$refs.form.validate())
        if (this.$refs.tradeContractTableForm) validates.push(this.$refs.tradeContractTableForm.validate())
        if (this.$refs.tradeBgTableForm) validates.push(this.$refs.tradeBgTableForm.validate())
        if (this.$refs.financeProviderTableForm) validates.push(this.$refs.financeProviderTableForm.validate())
        if (this.$refs.authorizationFileTableForm) validates.push(this.$refs.authorizationFileTableForm.validate())
        Promise.all(validates).then(results => {
          if (results.every(result => result)) {
            resolve()
          } else {
            reject()
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  $bgColor: #e9f3ff;

  .view-apply {
    padding: 20px;
    /* 顶部按钮 */
    .top-btns {
      overflow: hidden;
      /deep/ .el-button {
        float: left;
        margin-right: 20px;
      }
    }

    .inline-form {
      position: relative;
      padding-left: 228px;
      /deep/ .el-form-item {
        display: inline-block;
        width: calc(50% - 3px);
        margin-right: 0;

        &.apply-id {
          .el-form-item__content {
            width: calc(100% - 120px)
          }
        }
        &.authorization-no {
          .el-form-item__label {
            float: left;
            width: 100px;
          }
          .el-form-item__content {
            float: left;
            width: calc(100% - 100px)
          }
        }
      }

      .apply-code-btn, .read-apply-code-btn {
        width: 100px;
        position: absolute;
        right: -150px;
        top: 0;
        &.read-apply-code-btn {
          right: -300px;
        }
      }
    }

    /* 公共table样式 */
    /deep/ .el-table {
      .money-txt input {
        text-align: right;
      }
      .center-txt {
        text-align: center;
      }
    }

    .table-wrapper {
      margin-bottom: 30px;
      .table-title {
        margin-bottom: 8px;
      }

    }

    .upload-wrapper {
      /deep/ .el-table {
        margin-top: 10px;
      }
      .note {
        &::before {
          content: '';
          width: 20px;
          display: inline-block;
        }
        font-size: 13px;
        color: #cccccc;
      }
    }

    .bottom-wrapper {
      padding-top: 40px;
    }

    /deep/ .el-dialog {
      &.read-apply-code-dialog {
        .el-dialog__body {
          text-align: center;
        }
        .el-dialog__footer {
          padding: 0;
        }
      }
      .el-dialog__header {
        background-color: $bgColor;
      }
      .delete-btn {
        margin-left: 30px;
      }
      .btns {
        overflow: hidden;
        .el-button {
          float: left;
          margin-right: 20px;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>

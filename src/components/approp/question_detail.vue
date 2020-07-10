<template>
  <div class="question">
    <div class="container form02">
      <!-- {{personInfo}} -->
        <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
          <div class="survey_container">
                <p style="text-align:center;font-size:20px;font-weight:bold;font-family: 微软雅黑,Microsoft;">投资者风险承受能力评估问卷（自然人）</p>
                <!-- <p>时间：2020-05-07 11:20:33</p> -->
                <p class="one">一、财务状况</p>
                <div class="survey_box" id="s1">
                    <div class="row">
                        <h4>1、您的主要收入来源是：</h4>
                    </div>
                    <div class="row">
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q1" v-model="form2.q1" value="a">A.工资、劳务报酬
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q1" v-model="form2.q1" value="b">B.生产经营所得
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q1" v-model="form2.q1" value="c" >C.利息、股息、转让证券等金融性资产收入
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q1" v-model="form2.q1" value="d">D.出租、出售房地产等非金融性资产收入
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q1" v-model="form2.q1" value="e">E.无固定收入
                            </label>
                        </p>
                    </div>
                </div>
                <div class="survey_box" id="s2">
                    <div class="row">
                        <h4>2、最近您家庭预计进行证券投资的资金占家庭现有总资产(不含自住、自用房产
                            及汽车等固定资产)的比例是</h4>
                    </div>
                    <div class="row">
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q2" v-model="form2.q2" value="a">A．70%以上
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q2"  v-model="form2.q2" value="b" >B．50%-70%
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q2"  v-model="form2.q2" value="c">C．30%－50%
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q2"  v-model="form2.q2" value="d"> D．10%－30%
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q2"  v-model="form2.q2" value="e"> E．10%以下
                            </label>
                        </p>
                    </div>

                </div>
                <div class="survey_box" id="s3">
                    <div class="row">
                        <h4>3、您是否有尚未清偿的数额较大的债务，如有，其性质是：</h4>
                    </div>
                    <div class="row">
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q3"  v-model="form2.q3" value="a">A.没有
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q3"  v-model="form2.q3" value="b" >B.有，住房抵押贷款等长期定额债务
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q3"  v-model="form2.q3" value="c">C.有，信用卡欠款、消费信贷等短期信用债务
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q3"  v-model="form2.q3" value="d">D.有，亲朋之间借款
                            </label>
                        </p>

                    </div>

                </div>
                <div class="survey_box" id="s4">
                    <div class="row">
                        <h4>4、您可用于投资的资产数额（包括金融资产和不动产）为：</h4>
                    </div>
                    <div class="row">
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q4"  v-model="form2.q4" value="a">A. 不超过50万元人民币
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q4" v-model="form2.q4" value="b">B. 50万-300万元（不含）人民币
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q4" v-model="form2.q4" value="c">C. 300万-1000万元（不含）人民币
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q4" v-model="form2.q4" value="d">D. 1000万元人民币以上
                            </label>
                        </p>
                    </div>

                </div>
                <p class="one">二、投资知识</p>
                <div class="survey_box" id="s5">
                    <div class="row">
                        <h4>5、以下描述中何种符合您的实际情况：</h4>
                    </div>
                    <div class="row">
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q5" v-model="form2.q5" value="a">A. 现在或此前曾从事金融、经济或财会等与金融产品投资相关的工作超过两年
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q5" v-model="form2.q5" value="b" checked="">B. 已取得金融、经济或财会等与金融产品投资相关专业学士以上学位
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q5" v-model="form2.q5" value="c">C. 取得证券从业资格、基金从业资格、期货从业资格、注册会计师证书（CPA）或注册金融分析师证书（CFA）中的一项及以上
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q5" v-model="form2.q5" value="d">D. 我不符合以上任何一项描述
                            </label>
                        </p>
                    </div>
                </div>
                <p class="one">三、投资经验</p>
                <div class="survey_box" id="s6">
                    <div class="row">
                        <h4>6、您的投资经验可以被概括为：</h4>
                    </div>
                    <div class="row">
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q6" v-model="form2.q6" value="a">A．有限：除银行活期账户和定期存款外，我基本没有其他投资经验
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q6" v-model="form2.q6" value="b" checked="">B．一般：除银行活期账户和定期存款外，我购买过基金、保险等理财产品，但还需要进一步的指导
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q6" v-model="form2.q6" value="c">C．丰富：我是一位有经验的投资者，参与过股票、基金等产品的交易，并倾向于自己做出投资决策
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q6" v-model="form2.q6" value="d">D．非常丰富：我是一位非常有经验的投资者，参与过权证、期货或创业板等产品的交易
                            </label>
                        </p>
                    </div>
                </div>

                <div class="survey_box" id="s7">
                    <div class="row">
                        <h4>7、有一位投资者一个月内做了15笔交易（同一品种买卖各一次算一笔），您认为这样的交易频率：</h4>
                    </div>
                    <div class="row">
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q7" v-model="form2.q7" value="a">A. 太高了
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q7" v-model="form2.q7" value="b" checked="">B. 偏高
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q7" v-model="form2.q7" value="c">C. 正常
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q7" v-model="form2.q7" value="d">D. 偏低
                            </label>
                        </p>
                    </div>
                </div>
                <div class="survey_box" id="s8">
                    <div class="row">
                        <h4>8、过去一年时间内，您购买的不同产品或接受的不同服务（含同一类型的不同产品或服务）的数量是：</h4>
                    </div>
                    <div class="row">
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q8" v-model="form2.q8" value="a">A.5个以下
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q8" v-model="form2.q8" value="b" >B.6至10个
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q8" v-model="form2.q8" value="c">C.11至15个
                            </label>
                        </p>
                        <p>
                            <label class="radio-inline">
                                <input type="radio" name="q8" v-model="form2.q8" value="d">D.16个以上
                            </label>
                        </p>

                    </div>
                </div>
                <div class="survey_box" id="s9">
                    <div class="row">
                        <h4>9、以下金融产品或服务，您投资经验在两年以上的有：</h4>
                    </div>
                    <div class="row">
                        <p><label class="radio-inline">
                            <input type="radio" name="q9" v-model="form2.q9" value="a">A.银行存款等
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q9" v-model="form2.q9" value="b" checked="">B.债券、货币市场基金、债券型基金或其它固定收益类产品等
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q9" v-model="form2.q9" value="c">C.股票、混合型基金、偏股型基金、股票型基金等权益类投资品种等
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q9" v-model="form2.q9" value="d">D.期货、期权、融资融券
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q9" v-model="form2.q9" value="e">E.复杂金融产品、其他产品或服务
                        </label></p>
                    </div>

                </div>
                <div class="survey_box" id="s10">
                    <div class="row">
                        <h4>10、如果您曾经从事过金融市场投资，在交易较为活跃的月份，平均月交易额大概是多少：</h4>
                    </div>
                    <div class="row">
                        <p><label class="radio-inline">
                            <input type="radio" name="q10" v-model="form2.q10" value="a">A. 10万元以内
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q10" v-model="form2.q10" value="b" checked="">B. 10万元-30万元
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q10" v-model="form2.q10" value="c">C. 30万元-100万元
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q10" v-model="form2.q10" value="d">D. 100万元以上
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q10" v-model="form2.q10" value="e">E. 从未从事过金融市场投资
                        </label></p>
                    </div>
                </div>
                <p class="one">四、投资目标</p>
                <div class="survey_box" id="s11">
                    <div class="row">
                        <h4>11、您用于证券投资的大部分资金不会用作其它用途的时间段为：</h4>
                    </div>
                    <div class="row">
                        <p><label class="radio-inline">
                            <input type="radio" name="q11" v-model="form2.q11" value="a">A．0到1年
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q11" v-model="form2.q11" value="b">B．1到5年
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q11" v-model="form2.q11" value="c" >C．无特别要求
                        </label></p>

                    </div>
                </div>
                <div class="survey_box" id="s12">
                    <div class="row">
                        <h4>12、您打算重点投资于哪些种类的投资品种？</h4>
                    </div>
                    <div class="row">
                        <p><label class="radio-inline">
                            <input type="radio" name="q12" v-model="form2.q12" value="a">A.债券、货币市场基金、债券基金等固定收益类投资品种
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q12" v-model="form2.q12" value="b" >B.股票、混合型基金、偏股型基金、股票型基金等权益类投资品种
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q12" v-model="form2.q12" value="c">C.期货、期权、融资融券等
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q12" v-model="form2.q12" value="d">D.高风险金融产品或服务
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q12" v-model="form2.q12" value="e">E.其他产品或服务
                        </label></p>
                    </div>
                </div>

                <div class="survey_box" id="s13">
                    <div class="row">
                        <h4>13、假设有两种不同的投资：投资A期望获得5%的收益，有可能承担非常小的损失；投资B期望获得20%的收益，但有可能面临25%甚至更高的亏损。您将您的投资资产分配为： </h4>
                    </div>
                    <div class="row">
                        <p><label class="radio-inline">
                            <input type="radio" name="q13" v-model="form2.q13" value="a">A．全部投资于A
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q13" v-model="form2.q13" value="b">B．大部分投资于A
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q13" v-model="form2.q13" value="c">C．两种投资各一半
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q13" v-model="form2.q13" value="d">D．大部分投资于B
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q13" v-model="form2.q13" value="e">E．全部投资于B
                        </label></p>
                    </div>
                </div>

                <div class="survey_box" id="s14">
                    <div class="row">
                        <h4>14、当您进行投资时，您的期望收益是：
                        </h4>
                    </div>
                    <div class="row">
                        <p><label class="radio-inline">
                            <input type="radio" name="q14" v-model="form2.q14" value="a">A．尽可能保证本金安全，不在乎收益率比较低
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q14" v-model="form2.q14" value="b">B．产生一定的收益，可以承担一定的投资风险
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q14" v-model="form2.q14" value="c">C．产生较多的收益，可以承担较大的投资风险
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q14" v-model="form2.q14" value="d" checked="">D．实现资产大幅增长，愿意承担很大的投资风险
                        </label></p>
                    </div>
                </div>
                <p class="one">五、风险偏好</p>
                <div class="survey_box" id="s15">
                    <div class="row">
                        <h4>15、您认为自己能承受的最大投资损失是多少？
                        </h4>
                    </div>
                    <div class="row">
                        <p><label class="radio-inline">
                            <input type="radio" name="q15" v-model="form2.q15" value="a">A. 不能承受任何损失
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q15" v-model="form2.q15" value="b">B. 一定的投资损失
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q15" v-model="form2.q15" value="c" checked="">C. 较大的投资损失
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q15" v-model="form2.q15" value="d">D. 损失可能超过本金
                        </label></p>
                    </div>
                </div>
                <div class="survey_box" id="s16">
                    <div class="row">
                        <h4>16、您打算将自己的投资回报主要用于：
                        </h4>
                    </div>
                    <div class="row">
                        <p><label class="radio-inline">
                            <input type="radio" name="q16" v-model="form2.q16" value="a">A.改善生活
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q16" v-model="form2.q16" value="b">B.个体生产经营或证券投资以外的投资行为
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q16" v-model="form2.q16" value="c">C.履行扶养、抚养或赡养义务
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q16" v-model="form2.q16" value="d" checked="">D.本人养老或医疗
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q16" v-model="form2.q16" value="e">E.偿付债务
                        </label></p>
                    </div>
                </div>
                <p class="one">六、其他信息</p>
                <div class="survey_box" id="s17">
                    <div class="row">
                        <h4>17、您的年龄是：
                        </h4>
                    </div>
                    <div class="row">
                        <p><label class="radio-inline">
                            <input type="radio" name="q17" v-model="form2.q17" value="a">A. 18-30岁
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q17" v-model="form2.q17" value="b">B. 31-40岁
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q17" v-model="form2.q17" value="c" checked="">C. 41-50岁
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q17" v-model="form2.q17" value="d">D. 51-60岁
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q17" v-model="form2.q17" value="e">E. 超过60岁
                        </label></p>
                    </div>
                </div>
                <div class="survey_box" id="s18">
                    <div class="row">
                        <h4>18、今后五年时间内，您的父母、配偶以及未成年子女等需负法定抚养、扶养和赡养义务的人数为：
                        </h4>
                    </div>
                    <div class="row">
                        <p><label class="radio-inline">
                            <input type="radio" name="q18" v-model="form2.q18" value="a">A.1-2人
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q18" v-model="form2.q18" value="b" checked="">B.3-4人
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q18" v-model="form2.q18" value="c">C.5人以上
                        </label></p>

                    </div>
                </div>
                <div class="survey_box" id="s19">
                    <div class="row">
                        <h4>19、您的最高学历是：
                        </h4>
                    </div>
                    <div class="row">
                        <p><label class="radio-inline">
                            <input type="radio" name="q19" v-model="form2.q19" value="a">A.高中或以下
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q19" v-model="form2.q19" value="b">B.大学专科
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q19" v-model="form2.q19" value="c" >C.大学本科
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q19" v-model="form2.q19" value="d">D.硕士及以上
                        </label></p>

                    </div>
                </div>
                <div class="survey_box" id="s20">
                    <div class="row">
                        <h4>20、您家庭的就业状况是：
                        </h4>
                    </div>
                    <div class="row">
                        <p><label class="radio-inline">
                            <input type="radio" name="q20" v-model="form2.q20" value="a">A. 您与配偶均有稳定收入的工作
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q20" v-model="form2.q20" value="b">B. 您与配偶其中一人有稳定收入的工作
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q20" v-model="form2.q20" value="c">C. 您与配偶均没有稳定收入的工作或者已退休
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q20" v-model="form2.q20" value="d">D. 未婚，但有稳定收入的工作
                        </label></p>
                        <p><label class="radio-inline">
                            <input type="radio" name="q20" v-model="form2.q20" value="e">E. 未婚，目前暂无稳定收入的工作
                        </label></p>
                    </div>
                </div>
                <p>问卷得分：55用户类型：积极型
                    </p>
                <p></p>
                <p style="TEXT-ALIGN: left">
                    <span >　　<strong>投资者签署确认</strong></span>
                </p>
                <p style="TEXT-ALIGN: left">
                    <span >　　<strong>本人已经了解并愿意遵守国家有关证券市场管理的法律、法规、规章及相关业务规则，本人在此郑重承诺以上填写的内容真实、准确、完整并对其负责。若本人提供的信息发生任何重大变化，本人将及时书面通知贵公司。</strong></span>
                </p>
                <p style="TEXT-ALIGN: left">
                    <span >　　</span>
                </p>
                <p style="TEXT-ALIGN: left">
                    <span >　　</span>
                </p>
                <p style="TEXT-ALIGN: left">
                <span >　　
                <strong> </strong><strong>本人已阅读填写并确认：<img :src="'https://'+personInfo.autograph"width="150px" height="100px" style="border:#f0f0f0 solid 1px;vertical-align:top;"></strong><strong> </strong></span>
                </p>
                <p style="TEXT-ALIGN: left">
                    <span >　　</span>
                </p>
            </div>
        </el-form>
    </div>
  </div>
</template>

<script>
  import apis from '../../apis/apis';
  export default {
      name: 'messageboard',
      data() {
          return {
              listLoading : false,//
              personInfo:this.$route.query,
              pageInfo: { //分页
                  currentPage: 1,
                  pageSize: 20,//每页显示数据
                  pageTotal: 80,
              },
              form2: {
                //表单对象
                q1:"",
                q2:"",
                q3:"",
                q4:"",
                q5:"",
                q6:"",
                q7:"",
                q8:"",
                q9:"",
                q10:"",
                q11:"",
                q12:"",
                q13:"",
                q14:"",
                q15:"",
                q16:"",
                q17:"",
                q18:"",
                q19:"",
                q20:"",

              },
              formSearch: { //表单查询
                  name: '',
                  admin_name: '',
                  admin_names: '',
              },
              type_info:[],//用户类型
              rules:  {

              },
              formEditTitle:'编辑',//新增，编辑和查看标题
              formEditDisabled:false,//编辑弹窗是否可编辑
              dialogEdittVisible: false,  //编辑弹框显示
              dialogType:'',//弹框类型：add,edit,show
              tableData: [], //表单列表
              labelPosition: 'right', //lable对齐方式
              labelWidth: '80px', //lable宽度
              formLabelWidth: '120px',
              multipleSelection: []
          };
      },
      mounted(){
        this.onSearch();
      },
      methods: {
          /**
           * 查询列表
           */
          onSearch(){
              this.listLoading=true;
              if(this.formSearch.createtime){
                  this.formSearch.startdate=this.formSearch.createtime[0];
                  this.formSearch.enddate=this.formSearch.createtime[1];
              }
              // let param = Object.assign({}, this.formSearch,this.pageInfo);
              let user_id = this.personInfo.user_id;
              var _this = this;
              apis.msgApi.appropList({user_id:user_id})
              .then((data)=>{
                // console.log(data.data)
                  this.listLoading=false;
                  if (data && data.data) {
                      function getUserRules(data){//创建方法
                        var cs=new Array//声明存储数组
                        var question=new Array//声明存储数组
                        if(data){//判断是否传进有效数组
                          for(let i=0;i<data.length;i++){//循环传进来数组
                            cs.push(data[i])//声明的数组push传进来的每一项
                            if(data[i].question !==null ){//判断当前项下面是否有source
                              for(let j=0;j<data[i].question.length;j++){
                                question.push(data[i].question[j])
                              }
                            }
                          }
                          return question;
                          console.log(question)
                        }
                      }

                          if ( data.status == 200) {
                            this.pageInfo.pageTotal=data.data.total;
                            var a=getUserRules(data.data.data);
                            console.log(a);//question内容
                            this.form2.q1 = a[0].key;
                            this.form2.q2 = a[1].key;
                            this.form2.q3 = a[2].key;
                            this.form2.q4 = a[3].key;
                            this.form2.q5 = a[4].key;
                            this.form2.q6 = a[5].key;
                            this.form2.q7 = a[6].key;
                            this.form2.q8 = a[7].key;
                            this.form2.q9 = a[8].key;
                            this.form2.q10 = a[9].key;
                            this.form2.q11 = a[10].key;
                            this.form2.q12 = a[11].key;
                            this.form2.q13 = a[12].key;
                            this.form2.q14 = a[13].key;
                            this.form2.q15 = a[14].key;
                            this.form2.q16 = a[15].key;
                            this.form2.q17 = a[16].key;
                            this.form2.q18 = a[17].key;
                            this.form2.q19 = a[18].key;
                            this.form2.q20 = a[19].key;
                            // _this.tableData = data.data.data;
                          }
                          else if (json.message) {
                              this.$message({message: json.message,type: "error"});
                          }
                  }
              })
              .catch((err)=>{
                  this.listLoading=false;
                  this.$message({message: '查询异常，请重试',type: "error"});
              });
          },
          /**
           * 点击选择
           */
          handleSelectionChange(val) {
              this.multipleSelection = val;
              // this.$message({
              //     message: '选中的项是:' + JSON.stringify(this.multipleSelection),
              //     type: "success"
              // });
          },
      }
  };
</script>

<style>
    *{
        margin: 0;
        padding: 0;

    }
    .survey_container {
        width: 70%;
        margin: 20px auto;
        line-height:30px;
        font-family: 微软雅黑,Microsoft;
        overflow:hidden;
    }
    .big_box_one{
        line-height:30px;
        overflow:hidden;
    }
    .big_box_one .row p{padding-left:20px;}
    .survey_box {
        margin-bottom: 10px;
        border: 1px solid #f5f5f5;
        box-shadow: 0px 2px 4px #f5f5f5;
        padding: 10px 20px;
    }

    .survey_container .survey_box .row p label {
        font-size: 15px;
    }

    .s_active {
        display: block;
    }

    .s_default {
        display: none;
    }

    .row_btn {

        margin: 5% auto;
        text-align: center;
    }

    .btn {
        width: 100%;
    }
    .radio-inline{

        line-height: 25px;
    }
    .radio-inline input{margin-right:10px}
    .btn-success{background:#FA554A}
    .one{font-size:18px;font-weight:bold;}
    .question{
      background-color: #FFFFFF;
      padding:1rem 2rem;
    }
    /* .messageboard{
      height: 300px;

    } */
</style>

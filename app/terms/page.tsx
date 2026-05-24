import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '웹사이트 이용약관 | 모베토 Moveto',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen w-full px-4 py-20 text-text-secondary">
      <div className="modern-card mx-auto max-w-3xl rounded-2xl p-6 md:p-10">
        <h1 className="mb-8 font-display text-3xl font-800 tracking-tight text-text-primary">웹사이트 이용약관</h1>

        <div className="flex flex-col gap-8 text-sm leading-relaxed">
          <section>
            <h2 className="mb-3 font-display text-lg font-700 text-text-primary">제1조 (목적)</h2>
            <p>
              본 약관은 Moveto(이하 &apos;회사&apos; 또는 &apos;서비스&apos;)가 제공하는 웹 기반 파일 공유 서비스의
              이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-700 text-text-primary">제2조 (용어의 정의)</h2>
            <ul className="list-inside list-decimal space-y-1">
              <li>&quot;서비스&quot;란 로그인 유무와 관계없이 이용자가 파일을 업로드하고, 생성된 접속 코드를 통해 타인과 파일을 공유할 수 있도록 회사가 제공하는 모든 기능을 의미합니다.</li>
              <li>&quot;이용자&quot;란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
              <li>&quot;파일&quot;이란 이용자가 서비스를 통해 업로드, 저장, 공유, 다운로드하는 모든 데이터, 텍스트, 이미지, 영상, 소프트웨어 등을 의미합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-700 text-text-primary">제3조 (서비스의 제공 및 변경)</h2>
            <ul className="list-inside list-decimal space-y-1">
              <li>서비스는 기본적으로 제공되며, 파일 보관 기간, 업로드 용량 등 구체적인 서비스 내용은 회사의 정책에 따라 예고 없이 변경될 수 있습니다.</li>
              <li>파일은 지정된 만료 시간이 경과하면 시스템에서 자동 삭제되며, 회사는 삭제된 파일의 복구 의무를 지지 않습니다.</li>
              <li>회사는 안정적인 서비스 제공을 위해 서버 점검, 업데이트 등의 이유로 서비스 제공을 일시적으로 중단할 수 있으며, 이로 인해 발생하는 불이익에 대해 책임지지 않습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-700 text-text-primary">제4조 (이용자의 의무 및 금지행위)</h2>
            <p className="mb-2">
              이용자는 서비스를 이용함에 있어 다음 각 호의 행위를 하여서는 안 됩니다. 회사는 아래 규정을 위반한 파일을
              발견하거나 신고가 접수될 경우, 사전 통보 없이 해당 파일을 즉시 삭제하고 서비스 이용을 영구적으로 제한할 수
              있습니다.
            </p>
            <ul className="list-inside list-decimal space-y-1">
              <li>타인의 지식재산권, 저작권, 초상권 등 기타 권리를 침해하는 파일을 업로드 및 공유하는 행위</li>
              <li>불법 음란물, 도박, 명예훼손, 개인정보 유출 등 관련 법령에 위반되는 파일을 업로드하는 행위</li>
              <li>바이러스, 랜섬웨어, 악성코드 등 시스템 및 타 이용자에게 피해를 줄 수 있는 파일을 유포하는 행위</li>
              <li>범죄 행위를 목적으로 하거나 선량한 풍속 기타 사회질서를 해하는 행위</li>
              <li>회사의 서비스 운영을 고의로 방해하거나 서버에 과도한 부하를 유발하는 행위</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-700 text-text-primary">제5조 (책임의 한계 및 면책)</h2>
            <ul className="list-inside list-decimal space-y-4">
              <li>
                <strong>(무보증)</strong> 회사는 서비스를 &quot;있는 그대로(As-is)&quot; 제공하며, 서비스의 무결성,
                안정성, 특정 목적에의 적합성, 보안성을 명시적 또는 묵시적으로 보증하지 않습니다.
              </li>
              <li>
                <strong>(파일 손실 및 데이터 책임)</strong> 서비스를 통해 전송, 저장되는 파일의 유실, 손상, 변조에 대한
                책임은 전적으로 이용자 본인에게 있습니다. 회사는 서버 장애, 통신망 오류, 천재지변, 시스템 오류, 해킹
                등으로 인한 파일의 손실 및 삭제에 대해 어떠한 민·형사상 책임도 지지 않습니다. 이용자는 중요한 파일에
                대해 반드시 별도의 백업을 유지해야 합니다.
              </li>
              <li>
                <strong>(업로드 파일에 대한 책임)</strong> 회사는 이용자가 업로드하거나 공유하는 파일의 내용에 대해
                통제, 검열, 확인할 의무가 없으며, 파일의 합법성, 정확성, 신뢰성에 대해 어떠한 보증도 하지 않습니다.
                이용자가 업로드한 파일로 인해 저작권 침해 등 제3자와의 법적 분쟁이 발생할 경우, 회사는 이에 대한 어떠한
                책임도 지지 않으며, 이용자 본인의 비용과 책임으로 회사를 완전히 면책시켜야 합니다.
              </li>
              <li>
                <strong>(서비스 중단)</strong> 회사는 기술적 문제, 유지보수, 천재지변, 비상사태 등 불가피한 사유로 인해
                서비스를 일시적 또는 영구적으로 중단할 수 있으며, 이로 인해 이용자나 제3자에게 발생한 직접적, 간접적,
                부수적, 파생적 손해(수익 상실, 데이터 손실 등 포함)에 대해 일체의 책임을 지지 않습니다.
              </li>
              <li>
                <strong>(보안 및 통신망 문제)</strong> 회사는 업계 표준의 보안 조치를 취하나, 악의적인 해킹, 이용자의
                부주의(접속 코드 유출 등), 또는 통신망의 문제로 인한 정보 유출, 파일 탈취 등에 대해 책임지지 않습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-700 text-text-primary">제6조 (파일의 관리 및 삭제 권한)</h2>
            <ul className="list-inside list-decimal space-y-1">
              <li>
                회사는 이용자의 파일을 임의로 열람하지 않는 것을 원칙으로 하나, 법령에 따른 수사기관의 적법한 요청이
                있거나 제4조의 금지행위 위반이 명백하게 의심되는 경우 해당 파일을 확인하거나 사전 통지 없이 즉시 삭제할
                수 있습니다.
              </li>
              <li>
                만료 기간이 지난 파일은 시스템에 의해 자동 영구 삭제되며 어떠한 경우에도 복구되지 않습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-700 text-text-primary">제7조 (준거법 및 재판관할)</h2>
            <p>
              본 약관의 해석 및 이용자와 회사 간의 분쟁에 대해서는 대한민국 법령을 적용하며, 소송이 제기될 경우 회사의
              본점 소재지를 관할하는 법원을 전속적 합의관할법원으로 합니다.
            </p>
          </section>

          <section className="border-t-2 border-border-primary pt-8">
            <p>본 약관은 2026년 5월 10일부터 적용됩니다.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
